class SwBody extends HTMLBodyElement {
    #url;
    #image;
    #audio;
    #video;
    #libraryElement;

    constructor() {
        super();
        this.#libraryElement = this.querySelector('sw-library');

        const mediaElement = this.querySelector('sw-media');
        this.#url = mediaElement.url;
        this.#image = mediaElement.image;
        this.#audio = mediaElement.audio;
        this.#video = mediaElement.video;
    }

    async connectedCallback() {
        const library = this.#getLibrary() || await this.#refreshLibrary();
        const selection = localStorage.getItem('selection') ? JSON.parse(localStorage.getItem('selection')) : library.Images[0];
        this.#setSelection(selection);

        this.addEventListener('sw-upload', event => this.#updateLibrary(event.detail.data));
        this.addEventListener('sw-library', event => this.#setSelection(event.detail.selection));
    }

    #getLibrary() {
        if (localStorage.getItem('library')) {
            const library = JSON.parse(localStorage.getItem('library'));
            this.#libraryElement.render(library);
            return library;
        } return null;
    }

    async #refreshLibrary() {
        const library = await this.#libraryElement.refresh();
        localStorage.setItem('library', JSON.stringify(library));
        return library;
        //document.location.reload();
    }

    #updateLibrary(data) {
        localStorage.setItem('library', JSON.stringify(data.library));
        this.#libraryElement.render(data.library);
        this.#setSelection(data.selection);
        //document.location.reload();
    }

    #setSelection(media) {
        localStorage.setItem('selection', JSON.stringify(media));
        this.#image.style.display = 'none';
        this.#audio.style.display = 'none';
        this.#video.style.display = 'none';
        this.#url.value = media.url;
    
        switch (media.category) {
            case "Images": 
                this.#image.src = media.path;
                this.#image.style.display = 'block';
                break;
            case "Sounds":
                this.#audio.src = media.path;
                this.#audio.style.display = 'block';
                break;
            case "Videos":
                this.#video.src = media.path;
                this.#video.style.display = 'block';
                break;
        }

        this.parentElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
    }
}

customElements.define("sw-body", SwBody, { extends: "body" });