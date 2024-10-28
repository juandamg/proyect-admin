
import db from '../config/db.js';

export const obtenerBibliotecas = (req, res) => {
    db.query('SELECT * FROM biblioteca', (error, results) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            return res.status(500).send('Error al realizar la consulta');
        }
        res.status(200).json(results);
    });
};

export const crearBiblioteca = (req, res) => {
    const nuevaBiblioteca = req.body;
    db.query('INSERT INTO biblioteca SET ?', nuevaBiblioteca, (error, results) => {
        if (error) {
            console.error('Error al insertar:', error);
            return res.status(500).send('Error al crear la biblioteca');
        }
        res.status(201).json({ id_biblioteca: results.insertId, ...nuevaBiblioteca });
    });
};

export const actualizarBiblioteca = (req, res) => {
    const { id } = req.params;
    const nuevaBiblioteca = req.body;
    db.query('UPDATE biblioteca SET ? WHERE id_biblioteca = ?', [nuevaBiblioteca, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar la biblioteca:', error);
            return res.status(500).send('Error al actualizar la biblioteca');
        }
        res.status(200).send(`Biblioteca con ID ${id} actualizada exitosamente`);
    });
};

export const eliminarBiblioteca = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM biblioteca WHERE id_biblioteca = ?', [id], (error) => {
        if (error) {
            console.error('Error al eliminar:', error);
            return res.status(500).send('Error al eliminar la biblioteca');
        }
        res.status(204).send();
    });
};

export const obtenerLibrosPorBiblioteca = (req, res) => {
    const bibliotecaId = req.params.id;
    db.query('CALL ObtenerLibrosPorBiblioteca(?)', [bibliotecaId], (error, results) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            return res.status(500).send('Error al realizar la consulta');
        }
        res.status(200).json(results[0]); 
    });
};