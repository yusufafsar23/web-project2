const router = require('express').Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  try {
    // MongoDB bağlantı URL'sini güncelle
    const footballDataUri = process.env.MONGODB_URI.replace('lig_durumu', 'football_data');
    
    // Football data veritabanına bağlan
    const conn = await mongoose.createConnection(footballDataUri).asPromise();

    // Tüm takımların oyuncu verilerini topla
    const collections = await conn.db.listCollections().toArray();
    let tumOyuncular = [];

    for (const collection of collections) {
      if (collection.name.includes('oyuncu_verileri')) {
        const oyuncular = await conn
          .collection(collection.name)
          .find({})
          .toArray();
        
        tumOyuncular = [...tumOyuncular, ...oyuncular];
      }
    }

    // Oyuncu verilerini düzenle
    const formattedOyuncular = tumOyuncular.map(oyuncu => ({
      web_id: oyuncu.web_id,
      isim: oyuncu.isim,
      yas: oyuncu.yas?.$numberInt || oyuncu.yas,
      pozisyon: oyuncu.pozisyon,
      takim: oyuncu.takim,
      boy: oyuncu.boy,
      kilo: oyuncu.kilo,
      dogum_tarihi: oyuncu.dogum_tarihi,
      ulke: oyuncu.ulke,
      ulke_bayrak: oyuncu.ulke_bayrak_url,
      tercih_edilen_ayak: oyuncu.tercih_edilen_ayak,
      maas: oyuncu.maas,
      oduller: oyuncu.oduller || [],
      scouting_raporu: oyuncu.scouting_raporu?.map(stat => ({
        istatistik: stat.istatistik,
        aciklama: stat.aciklama,
        per90: stat.per90,
        percentile: stat.percentile
      })) || [],
      sezon_verileri: oyuncu.sezon_verileri?.filter(sezon => sezon.season)?.map(sezon => ({
        sezon: sezon.season,
        yas: sezon.age,
        takim: sezon.squad,
        lig: sezon.comp,
        mac: sezon.mp,
        ilk11: sezon.starts,
        dakika: sezon.mins,
        gol: sezon.goals,
        asist: sezon.assists,
        sari_kart: sezon.yellow_cards,
        kirmizi_kart: sezon.red_cards
      })) || []
    }));

    // Bağlantıyı kapat
    await conn.close();

    console.log(`${formattedOyuncular.length} oyuncu verisi gönderiliyor`);
    res.json(formattedOyuncular);
  } catch (err) {
    console.error('Futbolcular getirilirken hata:', err);
    res.status(500).json({ 
      message: 'Futbolcular getirilirken bir hata oluştu',
      error: err.message 
    });
  }
});

module.exports = router; 