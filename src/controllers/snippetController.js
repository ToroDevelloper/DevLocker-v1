const { validationResult } = require('express-validator');
const asyncHandler = require('../utils/asyncHandler');
const Snippet = require('../models/Snippet');

// @desc    Crear un snippet
// @route   POST /api/v1/snippets
// @access  Private
const createSnippet = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(
      errors
        .array()
        .map((e) => e.msg)
        .join(', ')
    );
  }

  const { title, language, code, tags } = req.body;

  // Regla de oro: el user se toma del token JWT, NO del body
  const snippet = await Snippet.create({
    user: req.user._id,
    title,
    language,
    code,
    tags,
  });

  res.status(201).json({
    success: true,
    data: snippet,
  });
});

// @desc    Listar snippets del usuario actual
// @route   GET /api/v1/snippets
// @access  Private
const getSnippets = asyncHandler(async (req, res) => {
  // Solo devuelve los snippets del usuario logueado
  const snippets = await Snippet.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.json({
    success: true,
    count: snippets.length,
    data: snippets,
  });
});

// @desc    Editar un snippet
// @route   PUT /api/v1/snippets/:id
// @access  Private (solo el dueño)
const updateSnippet = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(
      errors
        .array()
        .map((e) => e.msg)
        .join(', ')
    );
  }

  // Buscar snippet que pertenezca al usuario actual
  const snippet = await Snippet.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!snippet) {
    res.status(404);
    throw new Error('Snippet no encontrado o no tienes permiso para editarlo');
  }

  // Actualizar solo los campos enviados
  const { title, language, code, tags } = req.body;
  if (title !== undefined) snippet.title = title;
  if (language !== undefined) snippet.language = language;
  if (code !== undefined) snippet.code = code;
  if (tags !== undefined) snippet.tags = tags;

  const updated = await snippet.save();

  res.json({
    success: true,
    data: updated,
  });
});

// @desc    Borrar un snippet
// @route   DELETE /api/v1/snippets/:id
// @access  Private (solo el dueño)
const deleteSnippet = asyncHandler(async (req, res) => {
  // Muro de privacidad: buscar solo si pertenece al usuario
  const snippet = await Snippet.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!snippet) {
    res.status(404);
    throw new Error('Snippet no encontrado o no tienes permiso para borrarlo');
  }

  res.json({
    success: true,
    message: 'Snippet eliminado correctamente',
  });
});

module.exports = { createSnippet, getSnippets, updateSnippet, deleteSnippet };
