// backend/controllers/usuarioController.js
import db from '../config/db.js';

export const obtenerUsuarios = (req, res) => {
    db.query('SELECT * FROM usuario', (error, results) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            return res.status(500).send('Error al realizar la consulta');
        }
        res.status(200).json(results);
    });
};

export const crearUsuario = (req, res) => {
    const { nombre, apellido, correo, telefono, rol, direccion, contraseña } = req.body;
    const nuevoUsuario = { nombre, apellido, correo, telefono, rol, direccion, contraseña };
    
    db.query('INSERT INTO usuario SET ?', nuevoUsuario, (error, results) => {
        if (error) {
            console.error('Error al insertar:', error);
            return res.status(500).send('Error al crear el usuario');
        }
        res.status(201).json({ id_usuario: results.insertId, ...nuevoUsuario });
    });
};

export const actualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, telefono, rol, direccion, contraseña } = req.body;
    const usuarioActualizado = { nombre, apellido, correo, telefono, rol, direccion, contraseña };

    db.query('UPDATE usuario SET ? WHERE id_usuario = ?', [usuarioActualizado, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar el usuario:', error);
            return res.status(500).send('Error al actualizar el usuario');
        }
        res.status(200).send(`Usuario con ID ${id} actualizado exitosamente`);
    });
};

export const eliminarUsuario = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuario WHERE id_usuario = ?', [id], (error) => {
        if (error) {
            console.error('Error al eliminar:', error);
            return res.status(500).send('Error al eliminar el usuario');
        }
        res.status(204).send();
    });
};
