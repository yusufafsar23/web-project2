const mongoose = require('mongoose');

const fiksturSchema = new mongoose.Schema({
  evSahibi: {
    type: String,
    required: true
  },
  deplasman: {
    type: String,
    required: true
  },
  tarih: {
    type: Date,
    required: true
  },
  saat: {
    type: String,
    required: true
  },
  hafta: {
    type: Number,
    required: true
  },
  stadyum: {
    type: String,
    required: true
  },
  oynandiMi: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Fikstur', fiksturSchema); 