// backend/routes/imagenRoutes.js
import express from 'express';
import upload from '../config/multerConfig.js';
import { cargarImagen, obtenerImagen } from '../controllers/imagenController.js';

const router = express.Router();

router.post('/upload', upload.single('imagen'), cargarImagen); // Ruta para cargar una imagen
router.get('/:libroId', obtenerImagen); // Ruta para obtener la imagen de un libro por su ID

export default router;
