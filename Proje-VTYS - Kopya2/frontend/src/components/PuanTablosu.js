import React, { useState, useEffect } from 'react';
import takimService from '../services/takimService';
import './PuanTablosu.css';
import TakimDetay from './TakimDetay';

function PuanTablosu() {
  const [takimlar, setTakimlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seciliTakim, setSeciliTakim] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await takimService.getPuanDurumu();
        setTakimlar(data.premierLeague || []);
        setLoading(false);
      } catch (err) {
        console.error('Veri çekme hatası:', err);
        setError('Premier League verileri yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatTakimAdi = (takimAdi) => {
    // Özel karakterleri ve boşlukları düzelt
    return takimAdi
      .replace(/'/g, '') // Tek tırnakları kaldır
      .replace(/\s+/g, '-') // Boşlukları tire ile değiştir
      .toLowerCase(); // Küçük harfe çevir
  };

  const handleTakimClick = (takimAdi) => {
    console.log('Takıma tıklandı:', takimAdi);
    const formatlanmisTakimAdi = formatTakimAdi(takimAdi);
    console.log('Formatlanmış takım adı:', formatlanmisTakimAdi);
    setSeciliTakim(formatlanmisTakimAdi);
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div style={{color: 'red', padding: '20px'}}>{error}</div>;

  return (
    <div className="puan-tablosu-container">
      <h2>Premier League Puan Durumu</h2>
      <table className="puan-tablosu">
        <thead>
          <tr>
            <th>Sıra</th>
            <th>Takım</th>
            <th>O</th>
            <th>G</th>
            <th>B</th>
            <th>M</th>
            <th>AG</th>
            <th>YG</th>
            <th>AV</th>
            <th>P</th>
          </tr>
        </thead>
        <tbody>
          {takimlar.map((takim, index) => (
            <tr key={takim.team_name}>
              <td>{index + 1}</td>
              <td 
                className="takim-cell clickable"
                onClick={() => handleTakimClick(takim.team_name)}
              >
                <img 
                  src={takim.team_logo} 
                  alt={`${takim.team_name} logo`} 
                  className="takim-logo"
                />
                <span className="takim-isim">{takim.team_name}</span>
              </td>
              <td>{takim.played}</td>
              <td>{takim.wins}</td>
              <td>{takim.draws}</td>
              <td>{takim.losses}</td>
              <td>{takim.goals_for}</td>
              <td>{takim.goals_against}</td>
              <td>{takim.goal_diff}</td>
              <td className="puan">{takim.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {seciliTakim && (
        <TakimDetay
          ligKodu="GB-1"
          takimAdi={seciliTakim}
          onClose={() => setSeciliTakim(null)}
        />
      )}
    </div>
  );
}

export default PuanTablosu; 