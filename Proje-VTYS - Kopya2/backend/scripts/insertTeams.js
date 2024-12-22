const mongoose = require('mongoose');
require('dotenv').config();
const Takim = require('../models/Takim');

const takimlar = [
  {
    sira: 1,
    ad: "Liverpool",
    oynananMac: 15,
    galibiyet: 12,
    beraberlik: 2,
    maglubiyet: 1,
    attigiGol: 36,
    yedigiGol: 12,
    averaj: 24,
    puan: 38
  },
  {
    sira: 2,
    ad: "Manchester City",
    oynananMac: 15,
    galibiyet: 11,
    beraberlik: 3,
    maglubiyet: 1,
    attigiGol: 34,
    yedigiGol: 10,
    averaj: 24,
    puan: 36
  },
  {
    sira: 3,
    ad: "Arsenal",
    oynananMac: 15,
    galibiyet: 10,
    beraberlik: 3,
    maglubiyet: 2,
    attigiGol: 29,
    yedigiGol: 13,
    averaj: 16,
    puan: 33
  },
  {
    sira: 4,
    ad: "Tottenham",
    oynananMac: 15,
    galibiyet: 9,
    beraberlik: 4,
    maglubiyet: 2,
    attigiGol: 28,
    yedigiGol: 14,
    averaj: 14,
    puan: 31
  },
  {
    sira: 5,
    ad: "Newcastle United",
    oynananMac: 15,
    galibiyet: 9,
    beraberlik: 3,
    maglubiyet: 3,
    attigiGol: 30,
    yedigiGol: 15,
    averaj: 15,
    puan: 30
  },
  {
    sira: 6,
    ad: "Aston Villa",
    oynananMac: 15,
    galibiyet: 8,
    beraberlik: 4,
    maglubiyet: 3,
    attigiGol: 25,
    yedigiGol: 16,
    averaj: 9,
    puan: 28
  },
  {
    sira: 7,
    ad: "Brighton",
    oynananMac: 15,
    galibiyet: 8,
    beraberlik: 3,
    maglubiyet: 4,
    attigiGol: 22,
    yedigiGol: 17,
    averaj: 5,
    puan: 27
  },
  {
    sira: 8,
    ad: "Manchester United",
    oynananMac: 15,
    galibiyet: 7,
    beraberlik: 4,
    maglubiyet: 4,
    attigiGol: 20,
    yedigiGol: 18,
    averaj: 2,
    puan: 25
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB\'ye bağlandı');
    await Takim.deleteMany({}); // Mevcut verileri temizle
    await Takim.insertMany(takimlar);
    console.log('Takımlar başarıyla eklendi');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Hata:', err);
    process.exit(1);
  }); 