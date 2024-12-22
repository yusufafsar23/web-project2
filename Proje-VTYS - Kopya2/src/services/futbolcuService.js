import axios from 'axios';

const API_URL = '/api';

const futbolcuService = {
  getFutbolcular: async () => {
    try {
      const response = await axios.get(`${API_URL}/futbolcular`);
      return response.data;
    } catch (error) {
      console.error('Futbolcular getirilirken hata:', error);
      throw error;
    }
  }
};

export default futbolcuService; 