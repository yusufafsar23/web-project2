const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB Atlas\'a başarıyla bağlanıldı');
    
    // Veritabanı adını kontrol et
    console.log('Bağlantı URL:', process.env.MONGODB_URI);
    console.log('Veritabanı:', mongoose.connection.db.databaseName);
    
    try {
      // Koleksiyonları listele
      const collections = await mongoose.connection.db.listCollections().toArray();
      
      if (collections && collections.length > 0) {
        console.log('TÜM Koleksiyonlar:', collections.map(c => c.name));
        
        // Her koleksiyondaki doküman sayısını kontrol et
        for (const collection of collections) {
          const count = await mongoose.connection.db
            .collection(collection.name)
            .countDocuments();
          console.log(`${collection.name}: ${count} doküman`);
        }
      } else {
        console.log('Veritabanında koleksiyon bulunamadı');
        
        // Veritabanlarını listele
        const admin = mongoose.connection.db.admin();
        const dbs = await admin.listDatabases();
        console.log('Mevcut veritabanları:', dbs.databases.map(db => db.name));
      }
    } catch (err) {
      console.error('Koleksiyon kontrolü sırasında hata:', err);
    }
  })
  .catch(err => {
    console.error('MongoDB bağlantı hatası:', err.message);
    process.exit(1);
  });

// Test endpoint'i
app.get('/test', (req, res) => {
  res.json({ message: 'API çalışıyor' });
});

// API Routes
app.use('/api/takimlar', require('./routes/takimlar'));
app.use('/api/futbolcular', require('./routes/futbolcular'));

// Hata yakalama middleware'i
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Bir hata oluştu', error: err.message });
});

const PORT = process.env.PORT || 5061;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
  console.log('API endpoint\'i: http://localhost:' + PORT + '/api/takimlar');
});