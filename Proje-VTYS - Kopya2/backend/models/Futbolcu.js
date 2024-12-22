const mongoose = require('mongoose');

const futbolcuSchema = new mongoose.Schema({
  ad: {
    type: String,
    required: true
  },
  soyad: {
    type: String,
    required: true
  },
  yas: {
    type: Number,
    required: true
  },
  takim: {
    type: String,
    required: true
  },
  mevki: {
    type: String,
    required: true
  },
  golSayisi: {
    type: Number,
    default: 0
  },
  asistSayisi: {
    type: Number,
    default: 0
  },
  // Diğer istatistikler eklenebilir
}, {
  timestamps: true
});

module.exports = mongoose.model('Futbolcu', futbolcuSchema); 