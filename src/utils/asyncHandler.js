/**
 * Wrapper para capturar errores en funciones async
 * y pasarlos automáticamente al middleware de errores.
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
