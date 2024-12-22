import React, { useState, useEffect } from 'react';
import takimService from '../services/takimService';

function PuanTablosu() {
  const [takimlar, setTakimlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPuanDurumu();
  }, []);

  const getPuanDurumu = async () => {
    try {
      const data = await takimService.getPuanDurumu();
      setTakimlar(data);
      setLoading(false);
    } catch (err) {
      setError('Puan durumu yüklenirken bir hata oluştu');
      setLoading(false);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="puan-tablosu">
      <h2>Puan Durumu</h2>
      <table>
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
            <tr key={takim._id}>
              <td>{index + 1}</td>
              <td>{takim.ad}</td>
              <td>{takim.oynananMac}</td>
              <td>{takim.galibiyet}</td>
              <td>{takim.beraberlik}</td>
              <td>{takim.maglubiyet}</td>
              <td>{takim.attigiGol}</td>
              <td>{takim.yedigiGol}</td>
              <td>{takim.averaj}</td>
              <td>{takim.puan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PuanTablosu; 