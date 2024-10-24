import express from 'express';
import db from '../config.js'; // Importar la configuración de la conexión a la base de datos

const router = express.Router();

// Ruta para obtener todas las bibliotecas
router.get('/', (req, res) => {
    db.query('SELECT * FROM biblioteca', (error, results) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            return res.status(500).send('Error al realizar la consulta');
        }
        res.status(200).json(results); // Retorna el resultado como JSON
    });
});

// Crear una nueva biblioteca
router.post('/', (req, res) => {
    const nuevaBiblioteca = req.body;
    db.query('INSERT INTO biblioteca SET ?', nuevaBiblioteca, (error, results) => {
      if (error) {
        console.error('Error al insertar:', error);
        return res.status(500).send('Error al crear la biblioteca');
      }
      res.status(201).json({ id_biblioteca: results.insertId, ...nuevaBiblioteca });
    });
  });
  
// Actualizar una biblioteca
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const nuevaBiblioteca = req.body;
  
    db.query('UPDATE biblioteca SET ? WHERE id_biblioteca = ?', [nuevaBiblioteca, id], (error, results) => {
      if (error) {
        console.error('Error al actualizar la biblioteca:', error);
        return res.status(500).send('Error al actualizar la biblioteca');
      }
      res.status(200).send(`Biblioteca con ID ${id} actualizada exitosamente`);
    });
  });
  

  // Eliminar una biblioteca
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM biblioteca WHERE id_biblioteca = ?', [id], (error) => {
      if (error) {
        console.error('Error al eliminar:', error);
        return res.status(500).send('Error al eliminar la biblioteca');
      }
      res.status(204).send();
    });
  });
  

export default router;
