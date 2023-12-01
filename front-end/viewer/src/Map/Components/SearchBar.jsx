import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const SearchBar = ({ onSearchSubmit }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            onSearchSubmit({"name": searchQuery});
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                fullWidth
                variant="outlined"
                size='small'
                placeholder="country"
                value={searchQuery}
                onChange={handleInputChange}
                InputProps={{
                    endAdornment: (
                        <Button variant="filled" color="primary" onClick={handleSubmit} size='small'>
                            Search
                        </Button>
                    ),
                    style: {
                        color: 'white',
                        borderColor: 'white',
                      },
                }}
            />
        </Box>
    );
};

export default SearchBar;
