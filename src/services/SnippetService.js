const Snippet = require('../models/Snippet');

const crearSnippet = async (usuarioId, datosSnippet) => {
  const { titulo, lenguaje, codigo, etiquetas } = datosSnippet;

  let snippet = await Snippet.create({
    usuario: usuarioId,
    titulo,
    lenguaje,
    codigo,
    etiquetas,
  });

  snippet = await snippet.populate('usuario', 'nombre');
  snippet = snippet.toObject();

  return snippet;
};


const obtenerSnippetsUsuario = async (usuarioId) => {
  return await Snippet.find({ usuario: usuarioId })
    .sort({ createdAt: -1 })
    .populate('usuario', 'nombre');
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

  let actualizado = await snippet.save();
  actualizado = await actualizado.populate('usuario', 'nombre');
  return actualizado;
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
