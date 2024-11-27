const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'knowledge_base'
});

module.exports = pool;