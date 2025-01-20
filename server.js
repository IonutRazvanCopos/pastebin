const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./db');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/text');
});

app.use('/text', require('./routes/text')(db));

app.listen(PORT);