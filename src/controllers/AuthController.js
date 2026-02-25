const manejadorAsync = require('../utils/manejadorAsync');
const { validationResult } = require('express-validator');
const ServicioAuth = require('../services/AuthService');

const registro = manejadorAsync(async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const usuario = await ServicioAuth.registrarUsuario(req.body);

  res.status(201).json({
    exito: true,
    datos: usuario,
  });
});

const login = manejadorAsync(async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const usuario = await ServicioAuth.loginUsuario(req.body);

  res.status(200).json({
    exito: true,
    datos: usuario,
  });
});

module.exports = {
  registro,
  login,
};
