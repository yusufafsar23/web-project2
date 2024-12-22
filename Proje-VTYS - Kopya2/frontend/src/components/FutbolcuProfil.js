import React, { useState, useEffect } from 'react';
import futbolcuService from '../services/futbolcuService';
import './FutbolcuProfil.css';

const FutbolcuProfil = () => {
  const [futbolcular, setFutbolcular] = useState([]);
  const [filtrelenenFutbolcular, setFiltrelenenFutbolcular] = useState([]);
  const [aramaTermi, setAramaTermi] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seciliFutbolcu, setSeciliFutbolcu] = useState(null);

  useEffect(() => {
    const futbolculariGetir = async () => {
      try {
        const data = await futbolcuService.getFutbolcular();
        setFutbolcular(data);
        setFiltrelenenFutbolcular(data);
        setLoading(false);
      } catch (err) {
        setError('Futbolcular yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    futbolculariGetir();
  }, []);

  const handleArama = (e) => {
    const arananTerim = e.target.value.toLowerCase();
    setAramaTermi(arananTerim);
    
    const filtrelenmis = futbolcular.filter(futbolcu => 
      (futbolcu.isim?.toLowerCase()?.includes(arananTerim) || '') ||
      (futbolcu.takim?.toLowerCase()?.includes(arananTerim) || '')
    );
    
    setFiltrelenenFutbolcular(filtrelenmis);
  };

  const handleFutbolcuClick = (futbolcu) => {
    setSeciliFutbolcu(futbolcu);
  };

  if (loading) return <div className="loading">Yükleniyor...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="futbolcu-profil-container">
      <div className="arama-container">
        <input
          type="text"
          placeholder="Futbolcu veya takım ara..."
          value={aramaTermi}
          onChange={handleArama}
          className="arama-input"
        />
      </div>

      <div className="futbolcu-grid">
        {filtrelenenFutbolcular.map((futbolcu) => (
          <div 
            key={futbolcu.web_id} 
            className="futbolcu-kart"
            onClick={() => handleFutbolcuClick(futbolcu)}
          >
            <div className="futbolcu-baslik">
              <h3>{futbolcu.isim || 'İsimsiz'}</h3>
              <span className="takim">{futbolcu.takim || 'Takım bilgisi yok'}</span>
            </div>
            <div className="futbolcu-detaylar">
              <p>Yaş: {futbolcu.yas || 'Belirtilmemiş'}</p>
              <p>Pozisyon: {futbolcu.pozisyon || 'Belirtilmemiş'}</p>
              <p>Ülke: {futbolcu.ulke || 'Belirtilmemiş'}</p>
            </div>
          </div>
        ))}
      </div>

      {seciliFutbolcu && (
        <div className="futbolcu-detay-modal">
          <div className="modal-content">
            <button className="kapat-btn" onClick={() => setSeciliFutbolcu(null)}>×</button>
            <h2>{seciliFutbolcu.isim}</h2>
            
            <div className="detay-grid">
              <div className="kisisel-bilgiler">
                <h3>Kişisel Bilgiler</h3>
                <p>Yaş: {seciliFutbolcu.yas}</p>
                <p>Pozisyon: {seciliFutbolcu.pozisyon}</p>
                <p>Takım: {seciliFutbolcu.takim}</p>
                <p>Ülke: {seciliFutbolcu.ulke}</p>
                <p>Boy: {seciliFutbolcu.boy}</p>
                <p>Tercih Edilen Ayak: {seciliFutbolcu.tercih_edilen_ayak}</p>
              </div>

              {seciliFutbolcu.scouting_raporu && (
                <div className="scouting-raporu">
                  <h3>Scouting Raporu</h3>
                  <div className="stat-grid">
                    {seciliFutbolcu.scouting_raporu.map((stat, index) => (
                      <div key={index} className="stat-card">
                        <div className="stat-baslik">{stat.istatistik}</div>
                        <div className="stat-degerler">
                          <span>Per 90: {stat.per90}</span>
                          <span>Percentile: {stat.percentile}</span>
                        </div>
                        <div className="stat-bar">
                          <div 
                            className="stat-dolu"
                            style={{width: `${stat.percentile}%`}}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {seciliFutbolcu.sezon_verileri && (
                <div className="sezon-istatistikleri">
                  <h3>Sezon İstatistikleri</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Sezon</th>
                        <th>Takım</th>
                        <th>Lig</th>
                        <th>Maç</th>
                        <th>Gol</th>
                        <th>Asist</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seciliFutbolcu.sezon_verileri.map((sezon, index) => (
                        <tr key={index}>
                          <td>{sezon.sezon}</td>
                          <td>{sezon.takim}</td>
                          <td>{sezon.lig}</td>
                          <td>{sezon.mac}</td>
                          <td>{sezon.gol}</td>
                          <td>{sezon.asist}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FutbolcuProfil; 