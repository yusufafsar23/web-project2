import axios from 'axios';

const API_URL = 'http://localhost:5061/api';

const takimService = {
  // Tüm lig verilerini getir
  getPuanDurumu: async () => {
    try {
      console.log('API isteği yapılıyor...');
      const response = await axios.get(`${API_URL}/takimlar`);
      console.log('API yanıtı:', response.data);
      return response.data;
    } catch (error) {
      console.error('Puan durumu getirilirken hata:', error);
      throw error;
    }
  },

  // Takım detaylarını getir
  getTakimDetaylari: async (ligKodu, takimAdi) => {
    try {
      console.log(`${takimAdi} detayları getiriliyor...`);
      const response = await axios.get(`${API_URL}/takimlar/${ligKodu}/${takimAdi}`);
      console.log('Takım detayları:', response.data);
      return response.data;
    } catch (error) {
      console.error('Takım detayları getirilirken hata:', error);
      throw error;
    }
  }
};

export default takimService; 