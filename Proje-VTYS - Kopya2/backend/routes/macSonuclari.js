const router = require('express').Router();
const MacSonucu = require('../models/MacSonucu');

// Tüm maç sonuçlarını getir
router.get('/', async (req, res) => {
  try {
    const maclar = await MacSonucu.find().sort({ tarih: -1 });
    res.json(maclar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Yeni maç sonucu ekle
router.post('/', async (req, res) => {
  const macSonucu = new MacSonucu(req.body);
  try {
    const yeniMacSonucu = await macSonucu.save();
    res.status(201).json(yeniMacSonucu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 