const jwt = require('jsonwebtoken');
const manejadorAsync = require('../utils/manejadorAsync');
const Usuario = require('../models/Usuario');

const proteger = manejadorAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('No autorizado, token no proporcionado');
  }

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = await Usuario.findById(decodificado.id);

    if (!req.usuario) {
      res.status(401);
      throw new Error('No autorizado, usuario no encontrado');
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error('No autorizado, token inválido');
  }
});

module.exports = proteger;
