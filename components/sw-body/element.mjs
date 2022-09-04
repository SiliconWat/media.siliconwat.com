class SwBody extends HTMLBodyElement {
    constructor() {
        super();
        
    }

    import renderLibrary, { setSelection } from './library.mjs';

window.onload = () => {
    renderLibrary();
}

window.copyUrl = async () => {
    const url = document.getElementById('url1');
    await navigator.clipboard.writeText(url.value);
    url.focus();
}

window.pasteUrl = async () => {
    const url = document.getElementById('url2');
    url.value = await navigator.clipboard.readText();
}

window.getLibrary = async () => {
    const response = await fetch('https://dns.siliconwat.com:528/');
    const data = await response.json();
    localStorage.setItem('library', JSON.stringify(data.library));
    document.location.reload();
}

window.addMediaViaUrl = async event => {
    event.preventDefault();
    const response = await fetch('https://dns.siliconwat.com:528/', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(event.target)))
    });
    const data = await response.json();
    localStorage.setItem('library', JSON.stringify(data.library));
    setSelection(data.selection);
    document.location.reload();
}

window.addMediaViaUpload = async event => {
    event.preventDefault();
    const response = await fetch('https://dns.siliconwat.com:528/', {
        method: 'POST', 
        body: new FormData(event.target)
    });
    const data = await response.json();
    localStorage.setItem('library', JSON.stringify(data.library));
    setSelection(data.selection);
    document.location.reload();
}
}

customElements.define("sw-body", SwBody, { extends: "body" });