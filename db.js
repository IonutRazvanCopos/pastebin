const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'pastebindb',
    user: 'najuru',
    password: 'parola',
});

module.exports = pool;