// backend/config/db.js

import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1); // Salir del proceso en caso de error
    } else {
        console.log('Conectado a MySQL');
    }
});

export default connection;
