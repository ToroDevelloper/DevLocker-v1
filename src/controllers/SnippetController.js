const manejadorAsync = require('../utils/manejadorAsync');
const { validationResult } = require('express-validator');
const ServicioSnippet = require('../services/SnippetService');

//POST
const crearSnippet = manejadorAsync(async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const snippet = await ServicioSnippet.crearSnippet(
    req.usuario._id,
    req.body
  );

  res.status(201).json({
    exito: true,
    datos: snippet,
  });
});

//GET
const obtenerSnippets = manejadorAsync(async (req, res) => {
  const snippets = await ServicioSnippet.obtenerSnippetsUsuario(
    req.usuario._id
  );

  res.json({
    exito: true,
    cantidad: snippets.length,
    datos: snippets,
  });
});

//PUT
const actualizarSnippet = manejadorAsync(async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const snippetActualizado = await ServicioSnippet.actualizarSnippet(
    req.usuario._id,
    req.params.id,
    req.body
  );

  res.json({
    exito: true,
    datos: snippetActualizado,
  });
});

//DELETE
const eliminarSnippet = manejadorAsync(async (req, res) => {
  await ServicioSnippet.eliminarSnippet(req.usuario._id, req.params.id);

  res.json({
    exito: true,
    mensaje: 'Snippet eliminado correctamente',
  });
});

module.exports = {
  crearSnippet,
  obtenerSnippets,
  actualizarSnippet,
  eliminarSnippet,
};
