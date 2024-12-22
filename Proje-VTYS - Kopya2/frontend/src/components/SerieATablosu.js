import React, { useState, useEffect } from 'react';
import takimService from '../services/takimService';
import './PuanTablosu.css';

const SerieATablosu = () => {
  const [takimlar, setTakimlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await takimService.getPuanDurumu();
        // Serie A verilerini al
        setTakimlar(data.serieA || []);
        setLoading(false);
      } catch (err) {
        console.error('Veri çekme hatası:', err);
        setError('Serie A verileri yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="puan-tablosu-container">
      <h2>Serie A Puan Durumu</h2>
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
            <th>Son 5</th>
            <th>Gol Kralı</th>
          </tr>
        </thead>
        <tbody>
          {takimlar.map((takim, index) => (
            <tr key={takim.team_name}>
              <td>{index + 1}</td>
              <td className="takim-cell">
                <img src={takim.team_logo} alt={`${takim.team_name} logo`} className="takim-logo" />
                {takim.team_name}
              </td>
              <td>{takim.played}</td>
              <td>{takim.wins}</td>
              <td>{takim.draws}</td>
              <td>{takim.losses}</td>
              <td>{takim.goals_for}</td>
              <td>{takim.goals_against}</td>
              <td>{takim.goal_diff}</td>
              <td className="points">{takim.points}</td>
              <td>{takim.last_5}</td>
              <td>{`${takim.top_scorer.name} (${takim.top_scorer.goals})`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SerieATablosu; 