import React, { useState, useEffect } from 'react';
import takimService from '../services/takimService';
import TakimDetay from './TakimDetay';
import './PuanTablosu.css';

const LaLigaTablosu = () => {
  const [takimlar, setTakimlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seciliTakim, setSeciliTakim] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await takimService.getPuanDurumu();
        setTakimlar(data.laLiga || []);
        setLoading(false);
      } catch (err) {
        console.error('Veri çekme hatası:', err);
        setError('La Liga verileri yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatTakimAdi = (takimAdi) => {
    const ozelDurumlar = {
      'Atlético Madrid': 'atletico-madrid',
      'Athletic Club': 'athletic-club',
      'Real Madrid': 'real-madrid',
      'Barcelona': 'barcelona',
      'Real Sociedad': 'real-sociedad',
      'Real Betis': 'betis',
      'Valencia': 'valencia',
      'Villarreal': 'villarreal',
      'Sevilla': 'sevilla',
      'Mallorca': 'mallorca',
      'Osasuna': 'osasuna'
    };

    if (ozelDurumlar[takimAdi]) {
      return ozelDurumlar[takimAdi];
    }

    return takimAdi
      .toLowerCase()
      .replace(/[.']/g, '')
      .replace(/\s+/g, '-');
  };

  const handleTakimClick = (takimAdi) => {
    console.log('Tıklanan takım:', takimAdi);
    const formatlanmisTakimAdi = formatTakimAdi(takimAdi);
    console.log('Formatlanmış takım adı:', formatlanmisTakimAdi);
    setSeciliTakim(formatlanmisTakimAdi);
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div style={{color: 'red', padding: '20px'}}>{error}</div>;

  return (
    <div className="puan-tablosu-container">
      <h2>La Liga Puan Durumu</h2>
      <table className="puan-tablosu">
        <thead>
          <tr>
            <th>Sıra</th>
            <th className="takim-header">Takım</th>
            <th>O</th>
            <th>G</th>
            <th>B</th>
            <th>M</th>
            <th>AG</th>
            <th>YG</th>
            <th>Av</th>
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
          ligKodu="ES-1"
          takimAdi={seciliTakim}
          onClose={() => setSeciliTakim(null)}
        />
      )}
    </div>
  );
};

export default LaLigaTablosu; 