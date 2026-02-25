const mongoose = require('mongoose');

const esquemaSnippet = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio'],
      minlength: [3, 'El título debe tener al menos 3 caracteres'],
      trim: true,
    },
    lenguaje: {
      type: String,
      trim: true,
      lowercase: true,
      default: 'text',
    },
    codigo: {
      type: String,
      required: [true, 'El código es obligatorio'],
    },
    etiquetas: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Snippet', esquemaSnippet);
