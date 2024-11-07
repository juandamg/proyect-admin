import express from 'express';
import {
    obtenerLibros,
    crearLibro,
    actualizarLibro,
    eliminarLibro
} from '../controllers/libroController.js';

const router = express.Router();

router.get('/:bibliotecaId/libros', obtenerLibros);       // Obtener libros de una biblioteca
router.post('/:bibliotecaId/libros', crearLibro);         // Crear un nuevo libro en una biblioteca
router.put('/libros/:libroId', actualizarLibro);          // Actualizar un libro por ID
router.delete('/libros/:libroId', eliminarLibro);         // Eliminar un libro por ID

export default router;
