import express from 'express';
import {
    obtenerBibliotecas,
    crearBiblioteca,
    actualizarBiblioteca,
    eliminarBiblioteca,
    obtenerLibrosPorBiblioteca 
} from '../controllers/bibliotecaController.js';


const router = express.Router();

router.get('/', obtenerBibliotecas);       // Obtener todas las bibliotecas
router.post('/', crearBiblioteca);         // Crear una nueva biblioteca
router.put('/:id', actualizarBiblioteca);  // Actualizar una biblioteca
router.delete('/:id', eliminarBiblioteca); // Eliminar una biblioteca

router.get('/:id/libros', obtenerLibrosPorBiblioteca); // Llamar procedimiento almacenado para traer lo libro de una biblioteca

export default router;
