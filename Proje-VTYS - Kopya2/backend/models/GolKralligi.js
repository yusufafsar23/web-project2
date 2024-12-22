const mongoose = require('mongoose');

const golKralligiSchema = new mongoose.Schema({
  futbolcuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Futbolcu',
    required: true
  },
  golSayisi: {
    type: Number,
    default: 0
  },
  penaltiGolu: {
    type: Number,
    default: 0
  },
  macSayisi: {
    type: Number,
    default: 0
  },
  sezon: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('GolKralligi', golKralligiSchema); 