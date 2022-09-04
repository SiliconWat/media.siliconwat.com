const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/sw-media/shadow.css">
    <figure>
        <img>
        <audio controls></audio>
        <video controls></video>
    </figure>
    <aside>
        <input id="url1" type="url">
        <button onclick="copyUrl()">Copy</button>
    </aside>
`;

export default template;