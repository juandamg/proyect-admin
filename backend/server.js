// server.js
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import bibliotecaRoutes from './routes/Biblioteca.js'; // Importar el archivo de rutas de Biblioteca
import authRoutes from './routes/authRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import db from './config/db.js'; // Importar la conexión MySQL desde config/db.js
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env

const app = express();
const PORT = process.env.PORT || 3000;  // Definir el puerto desde .env o usar 3000 por defecto

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Dirección del frontend
    credentials: true // Habilitar cookies en CORS
}));

// Configuración de sesiones
app.use(session({
    secret: 'mysecretkey', // Cambia esto por una clave segura en producción
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // 'true' si estás en HTTPS
}));

app.use('/auth', authRoutes);
app.use('/bibliotecas', bibliotecaRoutes);
app.use('/usuarios', usuarioRoutes);

// Conectar a la base de datos y arrancar el servidor
db.connect((error) => {
    if (error) {
        console.error("Error al conectar a MySQL:", error);
        process.exit(1); // Salir del proceso si hay error en la conexión
    } else {
        console.log("Conectado a MySQL");
        
        app.listen(PORT, () => {
            console.log(`App escuchando en el puerto ${PORT}`);
        });
    }
});
