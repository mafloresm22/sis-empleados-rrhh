const { Pool } = require('pg');
require('dotenv').config();
console.log('ENV USER:', process.env.DB_USER);
console.log('ENV PASS:', process.env.DB_PASSWORD);
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'sis_empleados_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || ''
});
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ CONEXION FALLIDA', err.message);
    process.exit(1);
  }
  console.log('✅ CONEXION OK');
  release();
  process.exit(0);
});
