import React, { useState, useEffect } from 'react';
import takimService from '../services/takimService';
import './TakimDetay.css';

const TakimDetay = ({ ligKodu, takimAdi, onClose }) => {
  const [takimDetay, setTakimDetay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    const fetchTakimDetay = async () => {
      try {
        const data = await takimService.getTakimDetaylari(ligKodu, takimAdi);
        setTakimDetay(data);
        setLoading(false);
      } catch (err) {
        setError('Takım detayları yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchTakimDetay();
  }, [ligKodu, takimAdi]);

  if (loading) return <div className="takim-detay-loading">Yükleniyor...</div>;
  if (error) return <div className="takim-detay-error">{error}</div>;
  if (!takimDetay) return null;

  return (
    <div className="takim-detay-modal">
      <div className="takim-detay-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        
        <h2>{takimDetay.takim_adi}</h2>
        
        <div className="oyuncular-grid">
          {takimDetay.oyuncular.map((oyuncu, index) => (
            <div 
              key={oyuncu.web_id} 
              className="oyuncu-card"
              onClick={() => setSelectedPlayer(selectedPlayer === index ? null : index)}
            >
              <div className="oyuncu-header">
                <div className="oyuncu-info">
                  <h3>{oyuncu.isim}</h3>
                  <div className="oyuncu-meta">
                    <span>{oyuncu.pozisyon}</span>
                    <span>•</span>
                    <span>{oyuncu.yas} yaş</span>
                  </div>
                </div>
                <img 
                  src={oyuncu.ulke_bayrak} 
                  alt={oyuncu.ulke} 
                  className="ulke-bayrak"
                />
              </div>

              <div className="oyuncu-stats">
                <div className="stat-item">
                  <span>Boy</span>
                  <span>{oyuncu.boy}</span>
                </div>
                <div className="stat-item">
                  <span>Kilo</span>
                  <span>{oyuncu.kilo}</span>
                </div>
                <div className="stat-item">
                  <span>Ayak</span>
                  <span>{oyuncu.tercih_edilen_ayak}</span>
                </div>
                <div className="stat-item">
                  <span>Maaş</span>
                  <span>{oyuncu.maas}</span>
                </div>
              </div>

              {selectedPlayer === index && (
                <div className="oyuncu-detail">
                  {oyuncu.oduller.length > 0 && (
                    <div className="oduller-section">
                      <h4>Ödüller</h4>
                      <ul>
                        {oyuncu.oduller.map((odul, i) => (
                          <li key={i}>{odul}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="sezon-istatistikleri">
                    <h4>Sezon İstatistikleri</h4>
                    <table>
                      <thead>
                        <tr>
                          <th>Sezon</th>
                          <th>Takım</th>
                          <th>Lig</th>
                          <th>Maç</th>
                          <th>İlk 11</th>
                          <th>Dk</th>
                          <th>Gol</th>
                          <th>Asist</th>
                        </tr>
                      </thead>
                      <tbody>
                        {oyuncu.sezon_verileri.map((sezon, i) => (
                          <tr key={i}>
                            <td>{sezon.sezon}</td>
                            <td>{sezon.takim}</td>
                            <td>{sezon.lig}</td>
                            <td>{sezon.mac}</td>
                            <td>{sezon.ilk11}</td>
                            <td>{sezon.dakika}</td>
                            <td>{sezon.gol}</td>
                            <td>{sezon.asist}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {oyuncu.scouting_raporu.length > 0 && (
                    <div className="scouting-raporu">
                      <h4>Scouting Raporu</h4>
                      <div className="stats-grid">
                        {oyuncu.scouting_raporu
                          .filter(stat => stat.istatistik && stat.percentile)
                          .map((stat, i) => (
                            <div key={i} className="stat-card">
                              <div className="stat-title">{stat.istatistik}</div>
                              <div className="stat-values">
                                <span>Per 90: {stat.per90}</span>
                                <span>Percentile: {stat.percentile}</span>
                              </div>
                              <div className="stat-bar">
                                <div 
                                  className="stat-fill"
                                  style={{width: `${stat.percentile}%`}}
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TakimDetay; 