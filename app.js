const express = require('express');

const path = require('path');

const scrapper = require('./scrapper');

const app = express();
app.get('/data', (req, res) => {
    // res.sendFile(path.join(__dirname, 'index.html'));
    res.send(scrapper.scrapeData('sanitizer'));
});

app.listen(8080);