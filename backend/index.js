import express from 'express';
import cors from 'cors';
import bibliotecaRoutes from './routes/Biblioteca.js'; // Importar el archivo de rutas de Biblioteca
import db from './config.js'; // Importación de la conexión MySQL

const app = express();
const PORT = 3000;  // Define aquí el puerto

app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
    console.log(request);
    return response.status(200).send("It is working");
});



db.connect((error) => {
    if (error) {
        console.log(error);
        return;
    }

    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
    });

    console.log("Connected to MySQL");
});

// Usar las rutas de biblioteca
app.use('/bibliotecas', bibliotecaRoutes);







