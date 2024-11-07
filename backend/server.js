// server.js
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import bibliotecaRoutes from './routes/Biblioteca.js';
import authRoutes from './routes/authRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import db from './config/db.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import imagenRoutes from './routes/imagenRoutes.js';

dotenv.config(); // Cargar variables de entorno desde .env

const app = express();
const PORT = process.env.PORT || 3000;  // Definir el puerto desde .env o usar 3000 por defecto

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Configuración de sesiones
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use('/auth', authRoutes);
app.use('/bibliotecas', bibliotecaRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/imagenes', imagenRoutes); // Rutas para manejar imágenes

// Conectar a la base de datos MySQL
db.connect((error) => {
    if (error) {
        console.error("Error al conectar a MySQL:", error);
        process.exit(1); // Salir del proceso si hay error en la conexión
    } else {
        console.log("Conectado a MySQL");
    }
});

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/biblioteca')
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.error('Error de conexión a MongoDB:', error));


// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
