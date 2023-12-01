import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './CountryDetailPage.css'; 
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';
import { fetchCountryDetails } from '../utils/api';

const CountryDetailPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) {
        return;
    }
    setIsLoading(true);

    fetchCountryDetails({"code": code}).then(data => {
      setCountryData(data[0]);
      setIsLoading(false);
    }).catch(error => {
        setError(error);
        setIsLoading(false);
    });
  }, [code]);

  const handleBack = () => {
    navigate(-1); 
  };

  if (isLoading) {
    return (
        <div className="country-detail-page">
            <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="country-detail-page">
        <Typography variant='h6' mb={10}>{error.message}</Typography>
        <Button variant="outlined" onClick={handleBack}>
          Back
        </Button>
      </div>
    );
  }


  return (
    <div className="country-detail-page">

        <div className="country-content">
            <div className="country-info-container">
                <div className="country-flag-name">
                    <img src={countryData.flags.svg} alt={`Flag of ${countryData.name.common}`} />
                    <h1>{countryData.name.common}</h1>
                </div>
                <div className="country-details">

                   
                    <Typography variant='h6'>Official Name: {displayValue(countryData.name.official)}</Typography>
                    <Typography variant='h6'>Capital: {displayValue(countryData.capital)}</Typography>
                    <Typography variant='h6'>ISO Code: {displayValue(countryData.cca3)}</Typography>
                    <Typography variant='h6'>Independent: {countryData.independent ? "Yes" : "No"}</Typography>
                    <Typography variant='h6'>Currencies: {displayCurrencies(countryData.currencies)}</Typography>
                    <Typography variant='h6'>Region: {displayValue(countryData.region)}</Typography>
                    <Typography variant='h6'>Languages: {displayValue(countryData.languages)}</Typography>
                    <Typography variant='h6'>Area: {displayValue(countryData.area)}</Typography>
                    <Typography variant='h6'>Population: {displayValue(countryData.population)}</Typography>
                    <Typography variant='h6'>Drive Side: {displayValue(countryData.car?.side)}</Typography>
                    <Typography variant='h6'>Time Zones: {displayValue(countryData.timezones)}</Typography>

                </div>
            </div>
            <Button variant="outlined" onClick={handleBack}>
                Back
            </Button>
        </div>

</div>
  );
};

export default CountryDetailPage;


  function displayValue(value) {
    if (value) {
      if (typeof value === 'object') {
        if (Array.isArray(value)) {
          return value.length > 0 ? value.join(", ") : "Unavailable";
        } else {
          const values = Object.values(value);
          return values.length > 0 && values.every(v => v) ? values.join(", ") : "Unavailable";
        }
      }
      return value;
    }
    return "Unavailable";
  }

  function displayCurrencies(currencies) {
    if (currencies && typeof currencies === 'object' && Object.keys(currencies).length > 0) {
      return Object.values(currencies).map(currency => {
        return `${currency.name} (${currency.symbol})`;
      }).join(", ");
    }
    return "Unavailable";
  }