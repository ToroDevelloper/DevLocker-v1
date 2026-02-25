const manejadorErrores = (err, req, res, next) => {
  let codigoEstado = res.statusCode === 200 ? 500 : res.statusCode;
  let mensaje = err.message || 'Error interno del servidor';

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    codigoEstado = 404;
    mensaje = 'Recurso no encontrado';
  }

  if (err.code === 11000) {
    codigoEstado = 400;
    const campo = Object.keys(err.keyValue).join(', ');
    mensaje = `Valor duplicado para el campo: ${campo}`;
  }

  if (err.name === 'ValidationError') {
    codigoEstado = 400;
    mensaje = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  res.status(codigoEstado).json({
    exito: false,
    mensaje,
    pila: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = manejadorErrores;
