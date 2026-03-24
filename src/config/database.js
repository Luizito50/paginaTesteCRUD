
require('dotenv').config();
const { Pool } = require('pg');
console.log('PASSANDO PELO DATABASE.JS');
console.log(process.env.DB_USERNAME, process.env.DB_HOSTNAME, process.env.DB_NAME, process.env.DB_PASSWORD, process.env.DB_PORT);
const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOSTNAME,
    database: process.env.DB_NAME ,
    password: String(process.env.DB_PASSWORD),
    port: process.env.DB_PORT,
});

pool.query('SELECT NOW()')
.then(() => console.log('Conexão com PostgreSQL bem-sucedida!'))
.catch(err => console.error('Erro ao conectar ao banco:', err.message));


module.exports = pool;
 