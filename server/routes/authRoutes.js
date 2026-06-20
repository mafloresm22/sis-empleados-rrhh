const { Router } = require('express');
const { login, getMe } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = Router();

// POST /api/auth/login  → Iniciar sesión (pública)
router.post('/login', login);

// GET  /api/auth/me     → Obtener datos del usuario autenticado (protegida)
router.get('/me', verifyToken, getMe);

module.exports = router;
