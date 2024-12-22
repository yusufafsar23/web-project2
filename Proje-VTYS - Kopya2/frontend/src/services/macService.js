import axios from 'axios';

const API_URL = '/api';

const macService = {
  // Tüm maç sonuçlarını getir
  getMacSonuclari: async () => {
    try {
      const response = await axios.get(`${API_URL}/mac-sonuclari`);
      return response.data;
    } catch (error) {
      console.error('Maç sonuçları getirilirken hata:', error);
      throw error;
    }
  },

  // Yeni maç sonucu ekle
  addMacSonucu: async (macSonucu) => {
    try {
      const response = await axios.post(`${API_URL}/mac-sonuclari`, macSonucu);
      return response.data;
    } catch (error) {
      console.error('Maç sonucu eklenirken hata:', error);
      throw error;
    }
  },

  // Maç sonucu güncelle
  updateMacSonucu: async (id, macSonucu) => {
    try {
      const response = await axios.patch(`${API_URL}/mac-sonuclari/${id}`, macSonucu);
      return response.data;
    } catch (error) {
      console.error('Maç sonucu güncellenirken hata:', error);
      throw error;
    }
  }
};

export default macService; 