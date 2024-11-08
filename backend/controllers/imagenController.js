// backend/controllers/imagenController.js
import Imagen from '../models/Imagen.js';
import fs from 'fs';

export const cargarImagen = async (req, res) => {
    try {
        const { libroId } = req.body;

        if (!req.file) {
            return res.status(400).send('No se subió ningún archivo');
        }

        const imageData = fs.readFileSync(req.file.path); // Leer el archivo como buffer binario

        const imagen = new Imagen({
            libroId,
            data: imageData,
            mimetype: req.file.mimetype,
            size: req.file.size,
        });

        await imagen.save();

        // Opcionalmente, puedes eliminar el archivo temporal después de guardarlo en la base de datos
        fs.unlinkSync(req.file.path);

        res.status(201).json({ message: 'Imagen cargada exitosamente', imagen });
    } catch (error) {
        console.error('Error al cargar la imagen:', error);
        res.status(500).send('Error al cargar la imagen');
    }
};

export const obtenerImagen = async (req, res) => {
    try {
        const libroId = Number(req.params.libroId);

        if (isNaN(libroId)) {
            return res.status(400).send('ID de libro no válido');
        }

        const imagen = await Imagen.findOne({ libroId });
        
        if (!imagen) {
            return res.status(404).send('Imagen no encontrada');
        }

        // Configurar los encabezados y enviar la imagen como respuesta
        res.set('Content-Type', imagen.mimetype);
        res.send(imagen.data);
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        res.status(500).send('Error al obtener la imagen');
    }
};

