import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LigPuanDurumu from './components/LigPuanDurumu';
import AnaSayfa from './components/AnaSayfa';
import FutbolcuProfil from './components/FutbolcuProfil';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/">
              <img 
                src="/resimler/logo.jpg" 
                alt="FutbolAnaliz Logo" 
                className="navbar-logo"
              />
            </Link>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Ana Sayfa</Link></li>
            <li><Link to="/lig-puan" className="active">Lig Puan Durumu</Link></li>
            <li><Link to="/futbolcu-karsilastirma">Futbolcu Karşılaştırma</Link></li>
            <li><Link to="/futbolcu-profil">Futbolcu Profilleri</Link></li>
            <li><Link to="/canli">Canlı Maçlar</Link></li>
            <li><Link to="/istatistik">İstatistikler</Link></li>
            <li><Link to="/haber">Haberler</Link></li>
          </ul>
        </nav>

        {/* Ana İçerik */}
        <main>
          <Routes>
            <Route path="/" element={<AnaSayfa />} />
            <Route path="/lig-puan" element={<LigPuanDurumu />} />
            <Route path="/futbolcu-karsilastirma" element={<FutbolcuKarsilastirma />} />
            <Route path="/futbolcu-profil" element={<FutbolcuProfil />} />
            <Route path="/canli" element={<CanliMaclar />} />
            <Route path="/istatistik" element={<Istatistikler />} />
            <Route path="/haber" element={<Haberler />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer>
          <p>&copy; 2024 FutbolAnaliz. Tüm hakları saklıdır.</p>
        </footer>
      </div>
    </Router>
  );
}

const CanliMaclar = () => (
  <div className="canli-maclar">
    <h2>Canlı Maçlar</h2>
    {/* Canlı maçlar içeriği */}
  </div>
);

const Istatistikler = () => (
  <div className="istatistikler">
    <h2>İstatistikler</h2>
    {/* İstatistikler içeriği */}
  </div>
);

const Haberler = () => (
  <div className="haberler">
    <h2>Haberler</h2>
    {/* Haberler içeriği */}
  </div>
);

const FutbolcuKarsilastirma = () => (
  <div className="futbolcu-karsilastirma">
    <h2>Futbolcu Karşılaştırma</h2>
    {/* Futbolcu karşılaştırma içeriği */}
  </div>
);

export default App; 