import template from "./template.mjs";

class SwMedia extends HTMLElement {
    url;
    image;
    audio;
    video;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.url = this.shadowRoot.querySelector('input');
        this.image = this.shadowRoot.querySelector('img');
        this.audio = this.shadowRoot.querySelector('audio');
        this.video = this.shadowRoot.querySelector('video');
    }

    async copyUrl() {
        await navigator.clipboard.writeText(this.url.value);
        this.url.focus();
    }

    download(this) {
        const media = JSON.parse(localStorage.getItem('selection'));
        this.parentElement.download = media.name;
        this.parentElement.href = media.path;
        
    }
}

customElements.define("sw-media", SwMedia);