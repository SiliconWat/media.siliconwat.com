import fs from 'fs';
import https from 'https';
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { getMedia, upload, remove } from './media.mjs';

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
    await upload(req, res);
});

app.delete('/', (req, res) => {
    remove(req, res);
});

https.createServer({cert, key}, app).listen(528);

Array.prototype.at = function(index) {
    return index >= 0 ? this[index] : this[this.length + index];
};