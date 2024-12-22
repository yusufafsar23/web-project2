import axios from 'axios';

const API_URL = '/api';

const macService = {
  getMacSonuclari: async () => {
    try {
      const response = await axios.get(`${API_URL}/mac-sonuclari`);
      return response.data;
    } catch (error) {
      console.error('Maç sonuçları getirilirken hata:', error);
      throw error;
    }
  }
};

export default macService; 