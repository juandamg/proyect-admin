// backend/models/Imagen.js
import mongoose from 'mongoose';

const imagenSchema = new mongoose.Schema({
    libroId: {
        type: Number, // ID del libro en la base de datos relacional (SQL)
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    path: {
        type: String,
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
});

export default mongoose.model('Imagen', imagenSchema);
