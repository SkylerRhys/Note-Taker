const notes = require('express').Router();
const {readFile, writeFile} = require('fs').promises;
const db = './db/db.json';

const uuid = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

notes.get('/notes', (req, res) => {
    readFile(db).then((data) => res.json(JSON.parse(data)));
});

notes.post('/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readFile(db)
        .then(data => res.json(JSON.parse(data)))
        .then(data)
    };
});

module.exports = notes;