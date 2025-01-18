const express = require('express');

module.exports = (db) => {
    const router = express.Router();

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