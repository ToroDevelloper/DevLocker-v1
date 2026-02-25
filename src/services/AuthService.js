const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const registrarUsuario = async ({ nombre, email, password }) => {
  const usuarioExiste = await Usuario.findOne({ email });
  if (usuarioExiste) {
    throw new Error('El usuario ya existe con ese email');
  }

  const usuario = await Usuario.create({ nombre, email, password });

  return {
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    token: generarToken(usuario._id),
  };
};

const loginUsuario = async ({ email, password }) => {
  const usuario = await Usuario.findOne({ email }).select('+password');

  if (!usuario || !(await usuario.compararPassword(password))) {
    throw new Error('Credenciales inválidas');
  }

  return {
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    token: generarToken(usuario._id),
  };
};

module.exports = {
  registrarUsuario,
  loginUsuario,
};
