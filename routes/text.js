const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.post('/', async (req, res) => {
        const inputText = req.body.text;
        if (inputText) {
            await db.createText(inputText);
        }
        res.redirect('/text');
    });
    
    router.get('/', async (req, res) => {
        try {
            const result = await db.selectAllTexts();
            res.render('index', { list: result });
        } catch (err) {
            console.error('Database query error:', err);
            res.status(500).send('Internal Server Error');
        }
    });

    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const result = await db.selectTextWithId(id);
            if (!result) {
                return res.status(404).send('Text not found');
            }
            res.render('text', { fullText: result.content });
        } catch (err) {
            console.error('Database query error:', err);
            res.status(500).send('Internal Server Error');
        }
    });

    return router;
};