import React, { useState } from 'react';
import PuanTablosu from './PuanTablosu';
import LaLigaTablosu from './LaLigaTablosu';
import SerieATablosu from './SerieATablosu';
import BundesligaTablosu from './BundesligaTablosu';
import './LigPuanDurumu.css';

const LigPuanDurumu = () => {
  const [selectedLig, setSelectedLig] = useState('premier');

  return (
    <div className="lig-puan-container">
      <div className="lig-selector">
        <button 
          className={`lig-button ${selectedLig === 'premier' ? 'active' : ''}`}
          onClick={() => setSelectedLig('premier')}
        >
          Premier Lig
        </button>
        <button 
          className={`lig-button ${selectedLig === 'laliga' ? 'active' : ''}`}
          onClick={() => setSelectedLig('laliga')}
        >
          La Liga
        </button>
        <button 
          className={`lig-button ${selectedLig === 'seriea' ? 'active' : ''}`}
          onClick={() => setSelectedLig('seriea')}
        >
          Serie A
        </button>
        <button 
          className={`lig-button ${selectedLig === 'bundesliga' ? 'active' : ''}`}
          onClick={() => setSelectedLig('bundesliga')}
        >
          Bundesliga
        </button>
      </div>

      <div className="puan-durumu-content">
        {selectedLig === 'premier' && <PuanTablosu />}
        {selectedLig === 'laliga' && <LaLigaTablosu />}
        {selectedLig === 'seriea' && <SerieATablosu />}
        {selectedLig === 'bundesliga' && <BundesligaTablosu />}
      </div>
    </div>
  );
};

export default LigPuanDurumu; 