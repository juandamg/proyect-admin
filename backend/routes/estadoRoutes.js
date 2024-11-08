// routes/estadoRoutes.js
import express from 'express';
import { obtenerEstados } from '../controllers/estadoController.js';

const router = express.Router();

router.get('/', obtenerEstados);

export default router;
