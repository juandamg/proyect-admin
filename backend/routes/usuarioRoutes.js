// backend/routes/usuarioRoutes.js
import express from 'express';
import {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
} from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', obtenerUsuarios);       // Obtener todos los usuarios
router.post('/', crearUsuario);         // Crear un nuevo usuario
router.put('/:id', actualizarUsuario);  // Actualizar un usuario
router.delete('/:id', eliminarUsuario); // Eliminar un usuario

export default router;
