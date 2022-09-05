import fs from 'fs';
import crypto from 'crypto';
import fetch from 'node-fetch';
import git from './github.mjs';
// github file size limit: 100MB // recommended is 50MB
// git lfs track "*.mp4" // costs money
// https://coverr.co/

export async function upload(req, res) {
    const categories = { image: "Images", audio: "Sounds", video: "Videos" };
    if (req.body.url) {
        const file = await fetch(req.body.url);
        //console.log(file)
        const category = categories[file.headers.get('content-type').split('/')[0]];
        const id = file.headers.get('etag').replaceAll('"', ""); // crypto.randomUUID();
        const folder = `media/${category}/${id}`;
        const name = decodeURIComponent(req.body.url.split('/').at(-1));
        if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
        file.body.pipe(fs.createWriteStream(`${folder}/${name}`, { mode: 0o777 }).on('finish', () => git(category, name))).on('close', () => res.json(getMedia(category, id)));
    } else if (req.files) {
        let category, id, name;
        const media = Array.isArray(req.files.media) ? req.files.media : [ req.files.media ];
        media.forEach(file => {
            //console.log(file);
            category = categories[file.mimetype.split('/')[0]];
            id = file.md5;
            name = file.name
            file.mv(`media/${category}/${id}/${name}`);
        });
        res.json(getMedia(category, id))
        git(category, name);
    } else {
        res.status(400).json({ error: "Bad Request" });
    }
}

//#FIXME: delete empty folder?
export function remove(req, res) {
    fs.unlinkSync(req.body.path);
    res.json(getMedia());
}

export function getMedia(Category=null, id=null) {
    const library = { Images: [], Sounds: [], Videos: [] };
    for (const category in library) {
        const categoryFolder = fs.opendirSync('media/' + category);
        let folders = true;
        while (folders) {
            const folder = categoryFolder.readSync();
            if (folder) {
                if (folder.isDirectory()) {
                    const fileFolder = fs.opendirSync(`media/${category}/${folder.name}`);
                    let files = true;
                    while (files) {
                        const file = fileFolder.readSync();
                        if (file) {
                            if (file.name !== '.DS_Store') library[category].push(getData(fileFolder.path, file.name));
                        } else files = false;
                    }
                    fileFolder.close();
                }
            } else folders = false;
        } 
        categoryFolder.close();
    }
    return { library, selection: id ? library[Category].find(file => file.id === id) : null };
}

function getData(path, name) {
    const data = { name };
    data.id = path.split('/')[2];
    data.category = path.split('/')[1];
    data.path = `${path}/${name}`;
    data.url = "https://raw.githubusercontent.com/SiliconWat/media.siliconwat.com/main/" + data.path;
    return data;
}

// console.log(getMedia())