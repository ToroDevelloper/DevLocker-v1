require('dotenv').config();
const express = require('express');
const conectarBD = require('./src/config/basedatos');
const manejadorErrores = require('./src/middlewares/manejadorErrores');

const rutasAuth = require('./src/routes/rutasAuth');
const rutasSnippets = require('./src/routes/rutasSnippets');

conectarBD();

const aplicacion = express();
aplicacion.use(express.json());

aplicacion.get('/', (req, res) => {
  res.json({ mensaje: 'API DevLocker v1 - Bienvenido' });
});

aplicacion.use('/api/v1/auth', rutasAuth);
aplicacion.use('/api/v1/snippets', rutasSnippets);

aplicacion.use(manejadorErrores);

const PUERTO = process.env.PORT || 3000;
aplicacion.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});

