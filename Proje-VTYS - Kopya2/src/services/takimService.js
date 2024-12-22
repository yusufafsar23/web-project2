import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const takimService = {
  // Puan durumunu getir
  getPuanDurumu: async () => {
    try {
      const response = await axios.get(`${API_URL}/takimlar`);
      return response.data;
    } catch (error) {
      console.error('Puan durumu getirilirken hata:', error);
      throw error;
    }
  }
};

export default takimService; 