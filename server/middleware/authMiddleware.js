const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar el token JWT en las rutas protegidas.
 * Extrae el token del encabezado Authorization: Bearer <token>
 * Si el token es válido, añade los datos del usuario a req.user y llama next().
 * Si no, devuelve un error 401.
 */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            ok: false,
            message: 'Acceso denegado. No se proporcionó un token de autenticación.'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, email, role }
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Token inválido o expirado. Por favor inicia sesión nuevamente.'
        });
    }
};

/**
 * Middleware para verificar que el usuario autenticado tiene el rol de ADMIN o RRHH.
 * Debe usarse DESPUÉS de verifyToken en la cadena de middlewares.
 */
const verifyAdmin = (req, res, next) => {
    if (!req.user || !['ADMIN', 'RRHH'].includes(req.user.role)) {
        return res.status(403).json({
            ok: false,
            message: 'Acceso denegado. No tienes los permisos necesarios para esta acción.'
        });
    }
    next();
};

module.exports = { verifyToken, verifyAdmin };
