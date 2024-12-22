const mongoose = require('mongoose');

const haberSchema = new mongoose.Schema({
  baslik: {
    type: String,
    required: true
  },
  icerik: {
    type: String,
    required: true
  },
  resimUrl: {
    type: String
  },
  tarih: {
    type: Date,
    default: Date.now
  },
  kategori: {
    type: String,
    enum: ['Transfer', 'Maç', 'Kulüp', 'Diğer'],
    required: true
  },
  yazar: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Haber', haberSchema); 