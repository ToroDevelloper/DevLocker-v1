const { Router } = require('express');
const { body } = require('express-validator');
const { registro, login } = require('../controllers/controladorAuth');

const enrutador = Router();

enrutador.post(
  '/registro',
  [
    body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
    body('email')
      .isEmail()
      .withMessage('Debe ser un email válido')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),
  ],
  registro
);

enrutador.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Debe ser un email válido')
      .normalizeEmail(),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  ],
  login
);

module.exports = enrutador;
