import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SummaryCard from './SummaryCard';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { fetchCountryDetails } from '../../utils/api';

const InfoModal = ({ open, onClose, searchQuery }) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSelectCountry = (country) => {
        const code = country.cca3;
        navigate(`/country/${code}`);
    };

    useEffect(() => {
        if (searchQuery) {
            setLoading(true);
            setError(null);
            fetchCountryDetails(searchQuery).then(data => {
                if (data.length === 1) {
                    handleSelectCountry(data[0]);
                }
                setResult(data);
                setLoading(false);
            }).catch((error) => {
                setError(error);
                setLoading(false);
            });
        }
    }, [searchQuery]);

    const renderContent = () => {
        if (loading) return <CircularProgress />;
        if (error) return (
            <Typography>
                {error.message}
            </Typography>
        );
        if (result) {
            const data = result;
            if (data.length > 1) {
                return <SummaryCard data={data} onSelect={handleSelectCountry} />;
            }
        }
        return null;
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Matched Results</DialogTitle>
            <DialogContent>
                {renderContent()}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default InfoModal;

  
