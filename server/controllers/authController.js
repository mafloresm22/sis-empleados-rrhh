const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

/**
 * POST /api/auth/login
 * Autentica a un empleado con su correo empresarial y contraseña.
 * Devuelve un JWT si las credenciales son correctas.
 */
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            ok: false,
            message: 'El correo y la contraseña son obligatorios.'
        });
    }

    try {
        // Buscar empleado por correo empresarial
        const result = await pool.query(
            'SELECT * FROM empleados WHERE email = $1 AND employment_status = $2',
            [email, 'ACTIVO']
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                ok: false,
                message: 'Credenciales incorrectas o usuario inactivo.'
            });
        }

        const employee = result.rows[0];

        // Verificar contraseña con bcrypt
        const isPasswordValid = await bcrypt.compare(password, employee.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                ok: false,
                message: 'Credenciales incorrectas o usuario inactivo.'
            });
        }

        // Generar JWT
        const token = jwt.sign(
            {
                id: employee.id,
                email: employee.email,
                role: employee.role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        // Responder sin incluir la contraseña
        const { password: _pwd, ...employeeData } = employee;

        return res.status(200).json({
            ok: true,
            message: 'Inicio de sesión exitoso.',
            token,
            user: employeeData
        });

    } catch (error) {
        console.error('Error en login:', error.message);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

/**
 * GET /api/auth/me
 * Devuelve los datos del empleado actualmente autenticado (requiere token).
 */
const getMe = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, first_name, last_name, email, role, department, position, employment_status FROM empleados WHERE id = $1',
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado.' });
        }

        return res.status(200).json({ ok: true, user: result.rows[0] });

    } catch (error) {
        console.error('Error en getMe:', error.message);
        return res.status(500).json({ ok: false, message: 'Error interno del servidor.' });
    }
};

module.exports = { login, getMe };
