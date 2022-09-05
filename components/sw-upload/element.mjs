import template from "./template.mjs";

class SwUpload extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async pasteUrl() {
        this.shadowRoot.getElementById('url').value = await navigator.clipboard.readText();
    }

    async addMediaViaUrl(event) {
        event.preventDefault();
        const response = await fetch('https://dns.siliconwat.com:528/', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(event.target)))
        });
        this.dispatchEvent(new CustomEvent("sw-upload", { bubbles: true, composed: true, detail: { data: await response.json() }}));
    }
    
    async addMediaViaUpload(event) {
        event.preventDefault();
        const response = await fetch('https://dns.siliconwat.com:528/', {
            method: 'POST', 
            body: new FormData(event.target)
        });
        this.dispatchEvent(new CustomEvent("sw-upload", { bubbles: true, composed: true, detail: { data: await response.json() }}));
    }
}

customElements.define("sw-upload", SwUpload);