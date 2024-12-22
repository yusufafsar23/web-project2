const mongoose = require('mongoose');

const macSonucuSchema = new mongoose.Schema({
  evSahibi: {
    type: String,
    required: true
  },
  deplasman: {
    type: String,
    required: true
  },
  evSahibiSkor: {
    type: Number,
    required: true
  },
  deplasmanSkor: {
    type: Number,
    required: true
  },
  tarih: {
    type: Date,
    required: true
  },
  hafta: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('MacSonucu', macSonucuSchema); 