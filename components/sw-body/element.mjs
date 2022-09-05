class SwBody extends HTMLBodyElement {
    #mediaElement;
    #libraryElement;

    constructor() {
        super();
        this.#mediaElement = this.querySelector('sw-media');
        this.#libraryElement = this.querySelector('sw-library');   
    }

    async connectedCallback() {
        const library = this.#getLibrary() || await this.#refreshLibrary();
        const selection = localStorage.getItem('selection') ? JSON.parse(localStorage.getItem('selection')) : library.Images[0];
        this.#setSelection(selection);

        this.addEventListener('sw-upload', event => this.#updateLibrary(event.detail.data));
        this.addEventListener('sw-library', event => this.#handleLibrary(event.detail));
    }

    #handleLibrary(detail) {
        switch(detail.action) {
            case "refresh":
                this.#refreshLibrary();
                break;
            case "selection":
                this.#setSelection(detail.selection);
                break;
            case "delete":
                detail.data.selection = JSON.parse(localStorage.getItem('selection')).path === detail.path ? data.library.Images[0] : null;
                this.#updateLibrary(detail.data);
                break;
        }
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
        if (data.selection) this.#setSelection(data.selection);
        //document.location.reload();
    }

    #setSelection(media) {
        localStorage.setItem('selection', JSON.stringify(media));
        this.#mediaElement.update(media);
        this.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
    }
}

customElements.define("sw-body", SwBody, { extends: "body" });