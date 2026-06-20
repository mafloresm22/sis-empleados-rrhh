const { Router } = require('express');
const {
    getEmpleados,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
} = require('../controllers/empleadoController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = Router();

// Todas las rutas de empleados 
router.use(verifyToken);
router.get('/', getEmpleados); // GET  /api/empleados
router.get('/:idEmpleados', getEmpleadoById); // GET  /api/empleados/:idEmpleados
router.post('/', verifyAdmin, createEmpleado); // POST /api/empleados
router.put('/:idEmpleados', verifyAdmin, updateEmpleado); // PUT  /api/empleados/:idEmpleados
router.delete('/:idEmpleados', verifyAdmin, deleteEmpleado); // DELETE /api/empleados/:idEmpleados

module.exports = router;
