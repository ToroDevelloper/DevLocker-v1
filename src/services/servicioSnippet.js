const Snippet = require('../models/Snippet');

const crearSnippet = async (usuarioId, datosSnippet) => {
  const { titulo, lenguaje, codigo, etiquetas } = datosSnippet;

  const snippet = await Snippet.create({
    usuario: usuarioId,
    titulo,
    lenguaje,
    codigo,
    etiquetas,
  });

  return snippet;
};

const obtenerSnippetsUsuario = async (usuarioId) => {
  return await Snippet.find({ usuario: usuarioId }).sort({ createdAt: -1 });
};

const actualizarSnippet = async (usuarioId, snippetId, actualizaciones) => {
  const snippet = await Snippet.findOne({
    _id: snippetId,
    usuario: usuarioId,
  });

  if (!snippet) {
    throw new Error('Snippet no encontrado o acceso denegado');
  }

  const { titulo, lenguaje, codigo, etiquetas } = actualizaciones;

  if (titulo !== undefined) snippet.titulo = titulo;
  if (lenguaje !== undefined) snippet.lenguaje = lenguaje;
  if (codigo !== undefined) snippet.codigo = codigo;
  if (etiquetas !== undefined) snippet.etiquetas = etiquetas;

  return await snippet.save();
};

const eliminarSnippet = async (usuarioId, snippetId) => {
  const snippet = await Snippet.findOneAndDelete({
    _id: snippetId,
    usuario: usuarioId,
  });

  if (!snippet) {
    throw new Error('Snippet no encontrado o acceso denegado');
  }

  return snippet;
};

module.exports = {
  crearSnippet,
  obtenerSnippetsUsuario,
  actualizarSnippet,
  eliminarSnippet,
};
