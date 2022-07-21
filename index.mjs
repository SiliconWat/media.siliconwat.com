import fs from 'fs';
import https from 'https';
import express from 'express';
import cors from 'cors';
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

app.get('/', (req, res) => {
    res.json(getMedia());
});

app.post('/', async (req, res) => {
    const categories = { image: "Images", audio: "Sounds", video: "Videos" };
    if (req.body.url) {
        const file = await fetch(req.body.url);
        const category = categories[file.headers.get('content-type').split('/')[0]];
        const id = crypto.randomUUID();
        const folder = `media/${category}/${id}`;
        const name = decodeURIComponent(req.body.url.split('/').at(-1));
        if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
        file.body.pipe(fs.createWriteStream(`${folder}/${name}`).on('finish', () => git(req))).on('close', () => res.json(getMedia(category, id)));
    } else {

    }
});

app.delete('/', (req, res) => {
    // todo later 
});

https.createServer({cert, key}, app).listen(528);

// sudo chmod -R 777 .