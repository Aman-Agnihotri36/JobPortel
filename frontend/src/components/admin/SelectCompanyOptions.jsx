import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectCompanyOptions({ Company }) {
    const [company, setCompany] = React.useState('');

    const handleChange = (event) => {
        setCompany(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 110, height: 10, marginTop: 2.7 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Company</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={company}
                    label="company"
                    onChange={handleChange}
                >
                    {Company.map((one, index) => (
                        <MenuItem key={index} value={one}>{one.name}</MenuItem>
                    ))}

                </Select>
            </FormControl>
        </Box>
    );
}
