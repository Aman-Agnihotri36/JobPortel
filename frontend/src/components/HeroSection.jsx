import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { jobSliceActions } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(jobSliceActions.setSearchQuery(query))
        navigate("/browse")
    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='px-4 mx-auto py-2 rounded-full bg-gray-100    text-[#F83002] sm:font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='sm:text-5xl text-3xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Job</span></h1>
                <p className='text-sm sm:text-[1rem] p-2 sm:max-w-2xl sm:m-auto  font-semibold leading-relaxed text-gray-700 my-5'>The career you’ve always dreamed of starts here. Explore exciting job openings, showcase your skills, and connect with top recruiters. Take the next step towards your goals today and let your talent shine! </p>
            </div>

            <div className='flex sm:w-[55%] w-[80%] shadow-lg border border-gray-200 rounded-full pl-3 items-center gap-4 mx-auto'>
                <input
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    placeholder='Find your dream jobs'
                    className='outline-none border-none w-full '
                />

                <button onClick={searchJobHandler} className='rounded-r-full px-2 py-2 bg-[#6A38C2]'>
                    <SearchIcon className='text-white'></SearchIcon>
                </button>
            </div>
        </div>
    )
}

export default HeroSection
