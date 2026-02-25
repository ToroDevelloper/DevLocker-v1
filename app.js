require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middlewares/errorHandler');

// Rutas
const authRoutes = require('./src/routes/authRoutes');
const snippetRoutes = require('./src/routes/snippetRoutes');

// Conectar a MongoDB
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Ruta de salud
app.get('/', (req, res) => {
  res.json({ message: 'DevLocker API v1 🔐' });
});

// Montar rutas
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/snippets', snippetRoutes);

// Middleware global de errores (debe ir al final)
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
