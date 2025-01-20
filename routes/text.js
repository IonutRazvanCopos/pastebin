const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    router.post('/', async (req, res) => {
        const inputText = req.body.text;
        if (inputText) {
            await db.query('INSERT INTO texts(content) VALUES($1)', [inputText]);
        }
        res.redirect('/');
    });
    
    router.get('/', async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM texts');
            res.render('index', { list: result.rows });
        } catch (err) {
            console.error('Database query error:', err);
            res.status(500).send('Internal Server Error');
        }
    });

    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const result = await db.query('SELECT content FROM texts WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return res.status(404).send('Text not found');
            }
            res.render('text', { fullText: result.rows[0].content });
        } catch (err) {
            console.error('Database query error:', err);
            res.status(500).send('Internal Server Error');
        }
    });

    return router;
};