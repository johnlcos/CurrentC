const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: 5432,
  database: process.env.RDS_DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
