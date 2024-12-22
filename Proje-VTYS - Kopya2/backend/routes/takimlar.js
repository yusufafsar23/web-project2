const router = require('express').Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  try {
    // Mevcut koleksiyonları kontrol et
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Mevcut koleksiyonlar:', collections.map(c => c.name));

    // Tüm liglerin verilerini al
    const [premierLeague, laLiga, serieA, bundesliga] = await Promise.all([
      mongoose.connection.db
        .collection('Lig_Durumu')
        .findOne({ _id: "GB-1" }),
      mongoose.connection.db
        .collection('Lig_Durumu')
        .findOne({ _id: "ES-1" }),
      mongoose.connection.db
        .collection('Lig_Durumu')
        .findOne({ _id: "IT-1" }),
      mongoose.connection.db
        .collection('Lig_Durumu')
        .findOne({ _id: "DE-1" })  // Bundesliga ID'si
    ]);

    console.log('Premier League verisi:', premierLeague);
    console.log('La Liga verisi:', laLiga);
    console.log('Serie A verisi:', serieA);
    console.log('Bundesliga verisi:', bundesliga);

    if (!premierLeague?.teams && !laLiga?.teams && !serieA?.teams && !bundesliga?.teams) {
      return res.status(404).json({ 
        message: 'Lig verileri bulunamadı',
        mevcut_koleksiyonlar: collections.map(c => c.name)
      });
    }

    // Tüm liglerin takımlarını dönüştür
    const tumTakimlar = {
      premierLeague: premierLeague?.teams?.map(takim => ({
        team_name: takim.team_name,
        team_logo: takim.team_logo,
        played: takim.played,
        wins: takim.wins,
        draws: takim.draws,
        losses: takim.losses,
        goals_for: takim.goals_for,
        goals_against: takim.goals_against,
        goal_diff: takim.goal_diff,
        points: takim.points,
        last_5: takim.last_5_matches,
        top_scorer: {
          name: takim.top_scorers?.names?.[0] || '',
          goals: takim.top_scorers?.score || '0'
        }
      })).sort((a, b) => {
        const puanA = parseInt(a.points);
        const puanB = parseInt(b.points);
        if (puanA !== puanB) return puanB - puanA;
        return parseInt(b.goal_diff) - parseInt(a.goal_diff);
      }),
      laLiga: laLiga?.teams?.map(takim => ({
        team_name: takim.team_name,
        team_logo: takim.team_logo,
        played: takim.played,
        wins: takim.wins,
        draws: takim.draws,
        losses: takim.losses,
        goals_for: takim.goals_for,
        goals_against: takim.goals_against,
        goal_diff: takim.goal_diff,
        points: takim.points,
        last_5: takim.last_5_matches,
        top_scorer: {
          name: takim.top_scorers?.names?.[0] || '',
          goals: takim.top_scorers?.score || '0'
        }
      })).sort((a, b) => {
        const puanA = parseInt(a.points);
        const puanB = parseInt(b.points);
        if (puanA !== puanB) return puanB - puanA;
        return parseInt(b.goal_diff) - parseInt(a.goal_diff);
      }),
      serieA: serieA?.teams?.map(takim => ({
        team_name: takim.team_name,
        team_logo: takim.team_logo,
        played: takim.played,
        wins: takim.wins,
        draws: takim.draws,
        losses: takim.losses,
        goals_for: takim.goals_for,
        goals_against: takim.goals_against,
        goal_diff: takim.goal_diff,
        points: takim.points,
        last_5: takim.last_5_matches,
        top_scorer: {
          name: takim.top_scorers?.names?.[0] || '',
          goals: takim.top_scorers?.score || '0'
        }
      })).sort((a, b) => {
        const puanA = parseInt(a.points);
        const puanB = parseInt(b.points);
        if (puanA !== puanB) return puanB - puanA;
        return parseInt(b.goal_diff) - parseInt(a.goal_diff);
      }),
      bundesliga: bundesliga?.teams?.map(takim => ({
        team_name: takim.team_name,
        team_logo: takim.team_logo,
        played: takim.played,
        wins: takim.wins,
        draws: takim.draws,
        losses: takim.losses,
        goals_for: takim.goals_for,
        goals_against: takim.goals_against,
        goal_diff: takim.goal_diff,
        points: takim.points,
        last_5: takim.last_5_matches,
        top_scorer: {
          name: takim.top_scorers?.names?.[0] || '',
          goals: takim.top_scorers?.score || '0'
        }
      })).sort((a, b) => {
        const puanA = parseInt(a.points);
        const puanB = parseInt(b.points);
        if (puanA !== puanB) return puanB - puanA;
        return parseInt(b.goal_diff) - parseInt(a.goal_diff);
      })
    };

    console.log(`Premier League: ${tumTakimlar.premierLeague?.length} takım`);
    console.log(`La Liga: ${tumTakimlar.laLiga?.length} takım`);
    console.log(`Serie A: ${tumTakimlar.serieA?.length} takım`);
    console.log(`Bundesliga: ${tumTakimlar.bundesliga?.length} takım`);
    
    res.json(tumTakimlar);
  } catch (err) {
    console.error('Takımları getirme hatası:', err);
    res.status(500).json({ message: err.message });
  }
});

// Takım detaylarını getiren endpoint
router.get('/:ligKodu/:takimAdi', async (req, res) => {
  try {
    const { ligKodu, takimAdi } = req.params;
    
    // Lig adını belirle
    let ligAdi;
    switch(ligKodu) {
      case 'GB-1':
        ligAdi = 'Premier League';
        break;
      case 'ES-1':
        ligAdi = 'La Liga';
        break;
      case 'IT-1':
        ligAdi = 'Serie A';
        break;
      case 'DE-1':
        ligAdi = 'Bundesliga';
        break;
      default:
        ligAdi = 'Premier League';
    }
    
    // Takım adını düzgün formata çevir
    const formatlanmisTakimAdi = takimAdi
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // MongoDB bağlantı URL'sini güncelle
    const footballDataUri = process.env.MONGODB_URI.replace('lig_durumu', 'football_data');
    
    // Football data veritabanına bağlan
    const conn = await mongoose.createConnection(footballDataUri).asPromise();

    // Olası koleksiyon adlarını oluştur
    const possibleCollectionNames = [
      `oyuncu_verileri-${ligAdi}-${formatlanmisTakimAdi}-data`,
      `team_data-${ligAdi}-${formatlanmisTakimAdi}`,
      `oyuncu_verileri-${ligAdi}-${formatlanmisTakimAdi}-veriler`,
      `${ligAdi}-${formatlanmisTakimAdi}-data`
    ];

    console.log('Denenen koleksiyon adları:', possibleCollectionNames);

    // Mevcut koleksiyonları listele
    const collections = await conn.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    console.log('Mevcut koleksiyonlar:', collectionNames);

    // Doğru koleksiyon adını bul
    let oyuncuVerileri = [];
    let kullanılanKoleksiyon = '';

    for (const collectionName of possibleCollectionNames) {
      console.log(`${collectionName} koleksiyonu deneniyor...`);
      if (collectionNames.includes(collectionName)) {
        oyuncuVerileri = await conn
          .collection(collectionName)
          .find({})
          .toArray();
        
        if (oyuncuVerileri.length > 0) {
          kullanılanKoleksiyon = collectionName;
          console.log(`Veriler ${collectionName} koleksiyonunda bulundu!`);
          break;
        }
      }
    }

    if (oyuncuVerileri.length === 0) {
      return res.status(404).json({
        message: 'Takım verileri bulunamadı',
        denenen_koleksiyonlar: possibleCollectionNames,
        mevcut_koleksiyonlar: collectionNames,
        takım_adı: formatlanmisTakimAdi
      });
    }

    // Oyuncu verilerini düzenle
    const formattedData = {
      takim_adi: formatlanmisTakimAdi,
      oyuncular: oyuncuVerileri.map(oyuncu => ({
        web_id: oyuncu.web_id,
        isim: oyuncu.isim,
        yas: oyuncu.yas?.$numberInt || oyuncu.yas,
        pozisyon: oyuncu.pozisyon,
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
      }))
    };

    // Bağlantıyı kapat
    await conn.close();

    res.json(formattedData);
  } catch (err) {
    console.error('Takım detayları getirme hatası:', err);
    console.error('Hata detayı:', err.stack);
    res.status(500).json({ 
      message: 'Takım detayları getirilirken bir hata oluştu',
      error: err.message,
      stack: err.stack
    });
  }
});

module.exports = router; 