// backend/controllers/libroController.js
import db from '../config/db.js';

// Obtener todos los libros de una biblioteca específica
export const obtenerLibros = (req, res) => {
    const bibliotecaId = req.params.bibliotecaId;
    db.query('SELECT * FROM libro WHERE sede_id_sede = ?', [bibliotecaId], (error, results) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            return res.status(500).send('Error al obtener los libros');
        }
        res.status(200).json(results);
    });
};

// Crear un nuevo libro en una biblioteca específica
export const crearLibro = (req, res) => {
    const bibliotecaId = req.params.bibliotecaId;
    const { titulo, autor, isbn, editorial, n_paginas, categoria_id_categoria, estado_libro_id_estado } = req.body;
    const nuevoLibro = {
        titulo,
        autor,
        isbn,
        editorial,
        n_paginas,
        categoria_id_categoria,
        estado_libro_id_estado,
        sede_id_sede: bibliotecaId,
    };

    db.query('INSERT INTO libro SET ?', nuevoLibro, (error, results) => {
        if (error) {
            console.error('Error al insertar el libro:', error);
            return res.status(500).send('Error al crear el libro');
        }
        res.status(201).json({ id_libro: results.insertId, ...nuevoLibro });
    });
};

// Actualizar un libro existente
export const actualizarLibro = (req, res) => {
    const libroId = req.params.libroId;
    const { titulo, autor, isbn, editorial, n_paginas, categoria_id_categoria, estado_libro_id_estado, sede_id_sede } = req.body;
    const libroActualizado = {
        titulo,
        autor,
        isbn,
        editorial,
        n_paginas,
        categoria_id_categoria,
        estado_libro_id_estado,
        sede_id_sede
    };

    db.query('UPDATE libro SET ? WHERE id_libro = ?', [libroActualizado, libroId], (error, results) => {
        if (error) {
            console.error('Error al actualizar el libro:', error);
            return res.status(500).send('Error al actualizar el libro');
        }
        res.status(200).send(`Libro con ID ${libroId} actualizado exitosamente`);
    });
};

// Eliminar un libro
export const eliminarLibro = (req, res) => {
    const libroId = req.params.libroId;
    db.query('DELETE FROM libro WHERE id_libro = ?', [libroId], (error) => {
        if (error) {
            console.error('Error al eliminar el libro:', error);
            return res.status(500).send('Error al eliminar el libro');
        }
        res.status(204).send();
    });
};
