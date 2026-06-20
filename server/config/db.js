const { Pool } = require('pg');
require('dotenv').config();

// Pool de conexiones a PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'sis_empleados_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
});

// Verificar conexión al iniciar
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Error al conectar con PostgreSQL:', err.message);
    } else {
        console.log('✅ Conexión exitosa a PostgreSQL');
        release();
    }
});

module.exports = pool;
