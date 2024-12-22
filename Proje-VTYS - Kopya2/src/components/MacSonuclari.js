import React, { useState, useEffect } from 'react';
import macService from '../services/macService';

function MacSonuclari() {
  const [maclar, setMaclar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMaclar();
  }, []);

  const getMaclar = async () => {
    try {
      const data = await macService.getMacSonuclari();
      setMaclar(data);
      setLoading(false);
    } catch (err) {
      setError('Maç sonuçları yüklenirken bir hata oluştu');
      setLoading(false);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mac-sonuclari">
      <h2>Maç Sonuçları</h2>
      <div className="mac-listesi">
        {maclar.map((mac) => (
          <div key={mac._id} className="mac-karti">
            <div className="takim ev-sahibi">
              <span className="takim-adi">{mac.evSahibi}</span>
              <span className="skor">{mac.evSahibiSkor}</span>
            </div>
            <div className="ayrac">-</div>
            <div className="takim deplasman">
              <span className="skor">{mac.deplasmanSkor}</span>
              <span className="takim-adi">{mac.deplasman}</span>
            </div>
            <div className="mac-detay">
              <span className="tarih">
                {new Date(mac.tarih).toLocaleDateString('tr-TR')}
              </span>
              <span className="hafta">{mac.hafta}. Hafta</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MacSonuclari; 