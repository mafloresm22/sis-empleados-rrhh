const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');

// Inicializar app
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================
// MIDDLEWARES GLOBALES
// ============================================================

// Parsear JSON en el cuerpo de las peticiones
app.use(express.json());

// Configuración de CORS (permite peticiones desde el frontend)
app.use(cors({
    origin: [
        'http://localhost:5173',  // Vite dev server
        'http://localhost:3001',  // React dev server alternativo
        'http://127.0.0.1:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// ============================================================
// RUTAS
// ============================================================

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        ok: true,
        message: '🚀 Servidor de RRHH funcionando correctamente.',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Rutas principales
app.use('/api/auth', authRoutes);
app.use('/api/empleados', empleadoRoutes);

// ============================================================
// MANEJO DE RUTAS NO ENCONTRADAS (404)
// ============================================================

app.use((req, res) => {
    res.status(404).json({
        ok: false,
        message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
    });
});

// ============================================================
// MANEJO DE ERRORES GLOBALES
// ============================================================

app.use((err, req, res, next) => {
    console.error('Error no manejado:', err.stack);
    res.status(500).json({
        ok: false,
        message: 'Error interno del servidor.',
        ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
});

// ============================================================
// INICIAR SERVIDOR
// ============================================================

app.listen(PORT, () => {
    console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}\n`);
});

module.exports = app;
