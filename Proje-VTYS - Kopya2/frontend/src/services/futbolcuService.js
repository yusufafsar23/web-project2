import axios from 'axios';

const API_URL = '/api';

const futbolcuService = {
  getFutbolcular: async () => {
    try {
      console.log('Futbolcular getiriliyor...');
      const response = await axios.get(`${API_URL}/futbolcular`);
      console.log('Gelen futbolcu verileri:', response.data);
      return response.data;
    } catch (error) {
      console.error('Futbolcular getirilirken hata:', error);
      throw error;
    }
  }
};

export default futbolcuService; 