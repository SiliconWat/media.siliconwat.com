import renderLibrary from './library.mjs';

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
    const library = await fetch('https://dns.siliconwat.com:528/');
    localStorage.setItem('library', JSON.stringify(await library.json()));
    document.location.reload();
}

window.addMusic = async event => {
    event.preventDefault();
    const library = await fetch('https://dns.thonly.net:432/', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(event.target)))
    });    
    localStorage.setItem('library', JSON.stringify(await library.json()));
    document.location.reload();
}

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-SXYF6HQ17R');