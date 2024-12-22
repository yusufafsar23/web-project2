import React, { useState, useEffect } from 'react';
import futbolcuService from '../services/futbolcuService';

function FutbolcuListesi() {
  const [futbolcular, setFutbolcular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFutbolcular();
  }, []);

  const getFutbolcular = async () => {
    try {
      const data = await futbolcuService.getFutbolcular();
      setFutbolcular(data);
      setLoading(false);
    } catch (err) {
      setError('Futbolcular yüklenirken bir hata oluştu');
      setLoading(false);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Futbolcu Listesi</h2>
      <div className="futbolcu-list">
        {futbolcular.map((futbolcu) => (
          <div key={futbolcu._id} className="futbolcu-card">
            <h3>{futbolcu.ad} {futbolcu.soyad}</h3>
            <p>Takım: {futbolcu.takim}</p>
            <p>Mevki: {futbolcu.mevki}</p>
            <p>Yaş: {futbolcu.yas}</p>
            <p>Gol: {futbolcu.golSayisi}</p>
            <p>Asist: {futbolcu.asistSayisi}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FutbolcuListesi; 