// backend/controllers/authController.js
import db from '../config/db.js';

export const login = (req, res) => {
    console.log('Datos recibidos:', req.body); // Agregar este mensaje para verificar los datos recibidos
    const { email, password } = req.body;

    db.query('SELECT * FROM usuario  WHERE correo  = ?', [email], (err, results) => {
        if (err) {
            console.error('Error en la consulta de la base de datos:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        if (results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

        const user = results[0];

        if (password !== user.contraseña) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        req.session.userId = user.id;
        req.session.userEmail = user.email;

        res.json({ message: 'Login exitoso' });
    });
};


export const checkAuth = (req, res) => {
    if (req.session.userId) {
        res.json({ message: 'Autenticado' });
    } else {
        res.status(401).json({ error: 'No autenticado' });
    }
};


export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ error: 'Error al cerrar sesión' });
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout exitoso' });
    });
};