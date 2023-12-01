import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';


function MapComponent({onClickMap}) {

    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [currentCountry, setCurrentCountry] = useState(null);
    const selectedCountryMapRef = useRef(null);

    useEffect(() => {
        if (!mapInstanceRef.current) {
            return;
          }
        if (currentCountry) {
            const code = currentCountry.feature.properties.iso_a3;
            onClickMap({"code": code});
        }
    }, [currentCountry]);



    useEffect(() => {
        if (mapRef.current && !mapInstanceRef.current) {

            const southWest = L.latLng(-85, -90),
                  northEast = L.latLng(85, 90),
                  bounds = L.latLngBounds(southWest, northEast);

            const map = L.map(mapRef.current, {
              minZoom: 2,
              maxZoom: 18,
              maxBounds: bounds,
            }).setView([51.505, -0.09], 2);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors',
            }).addTo(map);          
            
            axios.get('./basemap.geo.json')
            .then(res => {
              console.log("here1");
              const data = res.data;

              const defaultStyle = {
                fillColor: "#black",
                weight: 1,
                opacity: 1,
                color: "white",
                fillOpacity: 0.7
              };
              
              const hoverStyle = {
                fillColor: "#C5FFF8",
                fillOpacity: 0.7,
                weight: 3,
                color: 'black',
                dashArray: '',
                opacity: 1
              };
              const geoJsonLayer = L.geoJSON(data, {
                  style: defaultStyle,
                  onEachFeature: (feature, layer) => {
                    layer.on({
                      mouseover: (e) => {
                          e.target.setStyle(hoverStyle);
                      },
                      mouseout: (e) => {
                          geoJsonLayer.resetStyle(e.target);
                      },
                      click: (e) => {
                        if (selectedCountryMapRef.current) {
                          selectedCountryMapRef.current.setStyle(defaultStyle);
                        }                          
                        setCurrentCountry(e.target);
                        selectedCountryMapRef.current = e.target;
                      }
                    });
                  }
              }).addTo(map);

            })
            .catch(error => {
              console.log("Failed to load map data");

            });


            mapInstanceRef.current = map;
        } 

      }, []);
    
      return <div ref={mapRef} className='map-container' style={{ height: '100%', width: '100%'}} />;

}



export default MapComponent
