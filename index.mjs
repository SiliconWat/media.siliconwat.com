import fs from 'fs';
import https from 'https';
import express from 'express';
import cors from 'cors';
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

app.post('/', (req, res) => {
    request(req.body.url).pipe(fs.createWriteStream(filename)).on('close', res.json(getMedia()));
});

https.createServer({cert, key}, app).listen(528);