const notes = require('express').Router();
const {readFile, writeFile} = require('fs').promises;
const db = './db/db.json';

notes.get('/notes', (req, res) => {
    readFile(db).then((data) => res.json(JSON.parse(data)));
});

notes.post('/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: crypto.randomUUID(),
        };

        readFile(db)
        .then(data => JSON.parse(data))
        .then(parseData => {
            parseData.push(newNote);
            return writeFile(db, JSON.stringify(parseData));
        })
        .then(() => res.json('Job done!'))
        .catch(err => res.status(500).json(err.message));
    };
});

module.exports = notes;