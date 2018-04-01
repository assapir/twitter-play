import express from 'express';

const app = express();

app.listen(3000, () => {
    console.log(`Starting express on port 3000`);
});

app.get(`/`, (req, res) => {
    res.send(`Hello World`);
});

app.get(`*`, (req, res) => {
    res.status(404).send(`Not found!`);
});