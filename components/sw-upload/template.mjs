const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/sw-upload/shadow.css">
    <fieldset>
        <legend><h2>Upload</h2></legend>
        <form onsubmit="this.getRootNode().host.addMediaViaUrl(event)">
            <button type="button" onclick="this.getRootNode().host.pasteUrl()">Paste</button>
            <input id="url" type="url" name="url" placeholder="https://" required>
            <button type="submit">Add</button>
        </form>
        <br><hr><br>
        <form onsubmit="this.getRootNode().host.addMediaViaUpload(event)">
            <input type="file" name="media" multiple accept="image/*, audio/*, video/*" onchange="this.form.dispatchEvent(new Event('submit'))">
        </form>
    </fieldset>
`;

export default template;