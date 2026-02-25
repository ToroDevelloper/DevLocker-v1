const { Router } = require('express');
const { body } = require('express-validator');
const protect = require('../middlewares/auth');
const {
  createSnippet,
  getSnippets,
  updateSnippet,
  deleteSnippet,
} = require('../controllers/snippetController');

const router = Router();

// Todas las rutas de snippets requieren autenticación
router.use(protect);

// POST /api/v1/snippets   — Crear snippet
router.post(
  '/',
  [
    body('title')
      .trim()
      .isLength({ min: 3 })
      .withMessage('El título es obligatorio y debe tener al menos 3 caracteres'),
    body('code')
      .notEmpty()
      .withMessage('El código es obligatorio'),
    body('language')
      .optional()
      .trim(),
    body('tags')
      .optional()
      .isArray()
      .withMessage('Los tags deben ser un arreglo de strings'),
  ],
  createSnippet
);

// GET /api/v1/snippets    — Listar mis snippets
router.get('/', getSnippets);

// PUT /api/v1/snippets/:id — Editar snippet (solo dueño)
router.put(
  '/:id',
  [
    body('title')
      .optional()
      .trim()
      .isLength({ min: 3 })
      .withMessage('El título debe tener al menos 3 caracteres'),
    body('code')
      .optional()
      .notEmpty()
      .withMessage('El código no puede estar vacío'),
    body('language')
      .optional()
      .trim(),
    body('tags')
      .optional()
      .isArray()
      .withMessage('Los tags deben ser un arreglo de strings'),
  ],
  updateSnippet
);

// DELETE /api/v1/snippets/:id — Borrar snippet (solo dueño)
router.delete('/:id', deleteSnippet);

module.exports = router;
