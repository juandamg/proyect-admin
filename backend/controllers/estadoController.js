// controllers/EstadoController.js
import db from '../config/db.js';

export const obtenerEstados = (req, res) => {
    db.query('SELECT id_estado, descripcion FROM estado_libro', (error, results) => {
        if (error) {
            console.error('Error al obtener los estados:', error);
            return res.status(500).send('Error al obtener los estados');
        }
        res.status(200).json(results);
    });
};
