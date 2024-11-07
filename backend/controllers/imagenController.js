// backend/controllers/imagenController.js
import Imagen from '../models/Imagen.js';
import fs from 'fs';
import path from 'path';

export const cargarImagen = async (req, res) => {
    try {
        const { libroId } = req.body; // ID del libro en la base de datos relacional (SQL)

        console.log("libroId recibido:", libroId);
        console.log("Archivo recibido:", req.file);

        if (!req.file) {
            return res.status(400).send('No se subió ningún archivo');
        }

        const imagen = new Imagen({
            libroId,
            filename: req.file.filename,
            path: req.file.path,
            mimetype: req.file.mimetype,
            size: req.file.size,
        });

        await imagen.save();
        res.status(201).json({ message: 'Imagen cargada exitosamente', imagen });
    } catch (error) {
        console.error('Error al cargar la imagen:', error);
        res.status(500).send('Error al cargar la imagen');
    }
};

export const obtenerImagen = async (req, res) => {
    try {
        const libroId = Number(req.params.libroId); // Convertir a número

        if (isNaN(libroId)) {
            return res.status(400).send('ID de libro no válido');
        }

        const imagen = await Imagen.findOne({ libroId });
        
        if (!imagen) {
            return res.status(404).send('Imagen no encontrada');
        }

        res.sendFile(path.resolve(imagen.path));
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        res.status(500).send('Error al obtener la imagen');
    }
};

