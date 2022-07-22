import fs from 'fs';
import https from 'https';
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import crypto from 'crypto';
import fetch from 'node-fetch';
import git from './github.mjs';
import { getMedia } from './media.mjs';

// expires on 2022-10-18
const cert = fs.readFileSync('private/fullchain.pem');
const key = fs.readFileSync('private/privkey.pem');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(fileUpload({ debug: false, uploadTimeout: 60000, useTempFiles: true, tempFileDir: 'media/temp', createParentPath: true, uriDecodeFileNames: true, safeFileNames: true, preserveExtension: true }));

app.get('/', (req, res) => {
    res.json(getMedia());
});

app.post('/', async (req, res) => {
    const categories = { image: "Images", audio: "Sounds", video: "Videos" };
    if (req.body.url) {
        const file = await fetch(req.body.url);
        console.log(file)
        const category = categories[file.headers.get('content-type').split('/')[0]];
        const id = file.headers.get('etag'); // crypto.randomUUID();
        const folder = `media/${category}/${id}`;
        const name = decodeURIComponent(req.body.url.split('/').at(-1));
        if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
        file.body.pipe(fs.createWriteStream(`${folder}/${name}`).on('finish', () => git(category, name))).on('close', () => res.json(getMedia(category, id)));
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
});

app.delete('/', (req, res) => {
    // todo later 
});

https.createServer({cert, key}, app).listen(528);

// https://coverr.co/
// sudo chmod -R 777 .