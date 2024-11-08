//CategoriaController.js
import db from '../config/db.js';

export const obtenerCategorias = (req, res) => {
    db.query('SELECT id_categoria, nombre_categoria FROM categoria', (error, results) => {
        if (error) {
            console.error('Error al obtener las categorías:', error);
            return res.status(500).send('Error al obtener las categorías');
        }
        res.status(200).json(results);
    });
};
