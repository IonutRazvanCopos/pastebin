const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'pastebindb',
    user: 'najuru',
    password: 'parola',
});

async function initializeDB() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS texts (
                id SERIAL PRIMARY KEY,
                content TEXT NOT NULL
            );
        `);
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

initializeDB();

async function createText(content) {
    const query = 'INSERT INTO texts(content) VALUES($1)';
    await pool.query(query, [content]);
}

async function selectAllTexts() {
    const query = 'SELECT * FROM texts';
    const result = await pool.query(query);
    return result.rows;
}

async function selectTextWithId(id) {
    const query = 'SELECT content FROM texts WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
}

module.exports = {
    createText,
    selectAllTexts,
    selectTextWithId
};