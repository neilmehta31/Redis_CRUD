const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: process.env.POSTGRES_DB || 'localhost',
  database: 'users',
  password: 'admin@123',
  port: '5432',    
});

module.exports = pool;