import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch } from 'react-redux';
import { jobSliceActions } from '../redux/jobSlice';


function FilterCard() {

    const [filter, setFilter] = useState('');

    const dispatch = useDispatch();

    // Handle filter selection
    const filterHandler = (e) => {
        setFilter(e.target.value);  // Update the filter state with the selected value
    }

    useEffect(() => {
        // Dispatch the filter to redux store when the filter changes
        dispatch(jobSliceActions.setSearchQuery(filter));
    }, [filter]);

    const filterData = [
        {
            filtrType: "Location",
            array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
        },
        {
            filtrType: "Industry",
            array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
        },
        {
            filtrType: "jobType",
            array: ["Remote", "Full Time", "Part Time"]
        }
    ];

    return (
        <div className='text-left w-full p-3 rounded-md'>
            <h1 className='text-xl font-bold'>Filter Jobs</h1>
            <hr className='mt-3' />
            <div className='mt-7'>
                {
                    filterData.map((item, index) => (
                        <FormControl key={index}>
                            <FormLabel id={`radio-buttons-group-label-${index}`}>{item.filtrType}</FormLabel>
                            <RadioGroup
                                aria-labelledby={`radio-buttons-group-label-${index}`}
                                name="radio-buttons-group"
                                value={filter}  // Ensuring only one button is selected at a time
                            >
                                {
                                    item.array.map((one, idx) => (
                                        <FormControlLabel
                                            key={idx}
                                            value={one}
                                            control={<Radio />}
                                            label={one}
                                            onClick={filterHandler}  // Update filter on click
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    ))
                }
            </div>
        </div>
    )
}

export default FilterCard;
