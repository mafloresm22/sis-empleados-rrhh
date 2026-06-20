const bcrypt = require('bcryptjs');
const pool = require('../config/db');

/**
 * GET /api/empleados
 * Lista empleados con soporte de búsqueda, filtro por departamento y paginación.
 * Query params: search, department, page, limit
 */
const getEmpleados = async (req, res) => {
    const { search = '', department = '', page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    try {
        // Construir condiciones dinámicas
        const conditions = ['1=1'];
        const params = [];
        let idx = 1;

        if (search) {
            conditions.push(
                `(LOWER(first_name || ' ' || last_name) LIKE $${idx} OR LOWER(email) LIKE $${idx} OR LOWER(position) LIKE $${idx})`
            );
            params.push(`%${search.toLowerCase()}%`);
            idx++;
        }

        if (department) {
            conditions.push(`department = $${idx}`);
            params.push(department);
            idx++;
        }

        const whereClause = conditions.join(' AND ');

        // Total de registros para paginación
        const countResult = await pool.query(
            `SELECT COUNT(*) FROM empleados WHERE ${whereClause}`,
            params
        );
        const total = parseInt(countResult.rows[0].count);

        // Datos paginados (sin contraseña)
        const dataResult = await pool.query(
            `SELECT id, first_name, last_name, dob, personal_email, phone, join_date,
                    department, position, basic_salary, allowances, deductions,
                    employment_status, email, role, created_at, updated_at
             FROM empleados
             WHERE ${whereClause}
             ORDER BY created_at DESC
             LIMIT $${idx} OFFSET $${idx + 1}`,
            [...params, parseInt(limit), offset]
        );

        return res.status(200).json({
            ok: true,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / parseInt(limit)),
            data: dataResult.rows
        });

    } catch (error) {
        console.error('Error en getEmpleados:', error.message);
        return res.status(500).json({ ok: false, message: 'Error interno del servidor.' });
    }
};

/**
 * GET /api/empleados/:id
 * Obtiene los datos de un empleado por su ID.
 */
const getEmpleadoById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `SELECT id, first_name, last_name, dob, personal_email, phone, join_date,
                    department, position, basic_salary, allowances, deductions,
                    employment_status, email, role, created_at, updated_at
             FROM empleados WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ ok: false, message: 'Empleado no encontrado.' });
        }

        return res.status(200).json({ ok: true, data: result.rows[0] });

    } catch (error) {
        console.error('Error en getEmpleadoById:', error.message);
        return res.status(500).json({ ok: false, message: 'Error interno del servidor.' });
    }
};

/**
 * POST /api/empleados
 * Crea un nuevo empleado. Hashea la contraseña antes de guardar.
 */
const createEmpleado = async (req, res) => {
    const {
        firstName, lastName, dob, personalEmail, phone, joinDate,
        department, position, basicSalary, allowances, deductions,
        employmentStatus, email, password, role
    } = req.body;

    // Validaciones básicas
    if (!lastName || !dob || !personalEmail || !phone || !joinDate ||
        !department || !position || !basicSalary || !email || !password) {
        return res.status(400).json({ ok: false, message: 'Faltan campos obligatorios.' });
    }

    try {
        // Verificar si el correo ya existe
        const exists = await pool.query(
            'SELECT id FROM empleados WHERE email = $1 OR personal_email = $2',
            [email, personalEmail]
        );

        if (exists.rows.length > 0) {
            return res.status(409).json({
                ok: false,
                message: 'Ya existe un empleado con ese correo empresarial o personal.'
            });
        }

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO empleados (
                first_name, last_name, dob, personal_email, phone, join_date,
                department, position, basic_salary, allowances, deductions,
                employment_status, email, password, role
             ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
             RETURNING id, first_name, last_name, email, department, position, employment_status, role, created_at`,
            [
                firstName || '', lastName, dob, personalEmail, phone, joinDate,
                department, position,
                parseFloat(basicSalary), parseFloat(allowances) || 0, parseFloat(deductions) || 0,
                employmentStatus || 'ACTIVO', email, hashedPassword, role || 'EMPLEADO'
            ]
        );

        return res.status(201).json({
            ok: true,
            message: 'Empleado registrado correctamente.',
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Error en createEmpleado:', error.message);
        return res.status(500).json({ ok: false, message: 'Error interno del servidor.' });
    }
};

/**
 * PUT /api/empleados/:id
 * Actualiza los datos de un empleado. Si se envía password, la hashea.
 */
const updateEmpleado = async (req, res) => {
    const { id } = req.params;
    const {
        firstName, lastName, dob, personalEmail, phone, joinDate,
        department, position, basicSalary, allowances, deductions,
        employmentStatus, email, password, role
    } = req.body;

    try {
        // Verificar si existe
        const existing = await pool.query('SELECT id FROM empleados WHERE id = $1', [id]);
        if (existing.rows.length === 0) {
            return res.status(404).json({ ok: false, message: 'Empleado no encontrado.' });
        }

        // Si se envía nueva contraseña, hashearla; si no, mantener la actual
        let passwordClause = '';
        const params = [
            firstName || '', lastName, dob, personalEmail, phone, joinDate,
            department, position,
            parseFloat(basicSalary), parseFloat(allowances) || 0, parseFloat(deductions) || 0,
            employmentStatus || 'ACTIVO', email, role || 'EMPLEADO'
        ];

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            params.push(hashedPassword);
            passwordClause = `, password = $${params.length}`;
        }

        params.push(id);
        const idParam = `$${params.length}`;

        const result = await pool.query(
            `UPDATE empleados SET
                first_name = $1, last_name = $2, dob = $3, personal_email = $4,
                phone = $5, join_date = $6, department = $7, position = $8,
                basic_salary = $9, allowances = $10, deductions = $11,
                employment_status = $12, email = $13, role = $14
                ${passwordClause}
             WHERE id = ${idParam}
             RETURNING id, first_name, last_name, email, department, position, employment_status, role, updated_at`,
            params
        );

        return res.status(200).json({
            ok: true,
            message: 'Empleado actualizado correctamente.',
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Error en updateEmpleado:', error.message);
        return res.status(500).json({ ok: false, message: 'Error interno del servidor.' });
    }
};

/**
 * DELETE /api/empleados/:id
 * Elimina permanentemente un empleado por su ID.
 */
const deleteEmpleado = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM empleados WHERE id = $1 RETURNING id, first_name, last_name',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ ok: false, message: 'Empleado no encontrado.' });
        }

        return res.status(200).json({
            ok: true,
            message: `Empleado ${result.rows[0].first_name} ${result.rows[0].last_name} eliminado correctamente.`
        });

    } catch (error) {
        console.error('Error en deleteEmpleado:', error.message);
        return res.status(500).json({ ok: false, message: 'Error interno del servidor.' });
    }
};

module.exports = {
    getEmpleados,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
};
