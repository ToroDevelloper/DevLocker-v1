const { Router } = require('express');
const { body } = require('express-validator');
const proteger = require('../middlewares/autenticacion');
const { crearSnippet, obtenerSnippets, actualizarSnippet, eliminarSnippet, } = require('../controllers/SnippetController');

const enrutador = Router();

enrutador.use(proteger);

enrutador.post(
  '/',
  [
    body('titulo')
      .trim()
      .isLength({ min: 3 })
      .withMessage('El título debe tener al menos 3 caracteres'),
    body('codigo').notEmpty().withMessage('El código es obligatorio'),
    body('lenguaje').optional().trim(),
    body('etiquetas')
      .optional()
      .isArray()
      .withMessage('Las etiquetas deben ser un arreglo'),
  ],
  crearSnippet
);

enrutador.get('/', obtenerSnippets);

enrutador.put(
  '/:id',
  [
    body('titulo')
      .optional()
      .trim()
      .isLength({ min: 3 })
      .withMessage('El título debe tener al menos 3 caracteres'),
    body('codigo').optional().notEmpty().withMessage('El código no puede estar vacío'),
    body('lenguaje').optional().trim(),
    body('etiquetas')
      .optional()
      .isArray()
      .withMessage('Las etiquetas deben ser un arreglo'),
  ],
  actualizarSnippet
);

enrutador.delete('/:id', eliminarSnippet);

module.exports = enrutador;
