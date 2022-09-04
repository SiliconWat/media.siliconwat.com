const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/sw-upload/shadow.css">
    <fieldset>
        <legend><h2>Upload</h2></legend>
        <form onsubmit="addMediaViaUrl(event)">
            <button type="button" onclick="pasteUrl()">Paste</button>
            <input id="url2" type="url" name="url" placeholder="https://" required>
            <button type="submit">Add</button>
        </form>
        <br><hr><br>
        <form onsubmit="addMediaViaUpload(event)">
            <input type="file" name="media" multiple accept="image/*, audio/*, video/*" onchange="this.form.dispatchEvent(new Event('submit'))">
        </form>
    </fieldset>
`;

export default template;