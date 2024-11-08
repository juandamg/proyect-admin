// backend/models/Imagen.js
import mongoose from 'mongoose';

const imagenSchema = new mongoose.Schema({
    libroId: {
        type: Number, // ID del libro en la base de datos relacional (SQL)
        required: true,
    },
    data: {
        type: Buffer, // Aquí almacenaremos los datos binarios de la imagen
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    collection: 'imagen' // Nombre de la colección en MongoDB
});

export default mongoose.model('Imagen', imagenSchema);
