import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapPage from './Map/MapPage';
import CountryDetailPage from './Country/CountryDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapPage />} exact />
        <Route path="/country/:code" element={<CountryDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
