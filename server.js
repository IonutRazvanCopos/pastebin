const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./db');

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.post('/', async (req, res) => {
    const inputText = req.body.text;
    if (inputText) {
        await db.query('INSERT INTO texts(content) VALUES($1)', [inputText]);
    }
    res.redirect('/');
});

app.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM texts');
        res.render('index', { list: result.rows });
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.use('/text', require('./routes/text')(db));

app.listen(PORT);