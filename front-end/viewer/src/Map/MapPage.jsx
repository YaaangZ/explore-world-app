import './MapPage.css'
import React, { useState } from 'react';
import SearchBar from './Components/SearchBar';
import InfoModal from './Components/InfoModal';
import MapComponent from './Components/MapComponent';
import logo from '/logo.png';

const MapPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const handleSearchSubmit = (query) => {
        setSearchQuery(query);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <div className="map-page">
            <header className='header'>
                <img src={logo} alt="Logo" className="map-logo" />
                <h1 className="map-title">Explore The World</h1>
                <div className='serach-bar-container'>
                    <SearchBar onSearchSubmit={handleSearchSubmit} />
                </div>
            </header>
            <div className="map-container">
                <MapComponent onClickMap={handleSearchSubmit}/>
            </div>
            <InfoModal
                open={openModal}
                onClose={handleCloseModal}
                searchQuery={searchQuery}
            />
        </div>
    );

};

export default MapPage;