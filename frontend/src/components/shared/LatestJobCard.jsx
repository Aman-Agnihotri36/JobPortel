import React from 'react'
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function LatestJobCard({ Job }) {

    const navigate = useNavigate()
    let { user } = useSelector(store => store.auth)

    const OnclickHandler = () => {
        if (user) {
            navigate(`/description/${Job?._id}`)
        }
    }

    return (
        <div onClick={OnclickHandler} className=' sm:text-left w-[300px] sm:w-[30%] shadow-xl my-3 bg-white border border-gray-100 cursor-pointer rounded-md p-5'>
            <div>
                <h1 className='font-medium text-lg'>{Job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{Job?.title}</h1>
                <p className='text-sm text-gray-600'>{Job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Chip label=<span className='text-red-600'>{Job?.position}</span> />
                <Chip label=<span className='text-purple-600'>{Job?.jobType}</span> />
                <Chip label=<span className='text-blue-950'>{Job?.salary}</span> />


            </div>
        </div>
    )
}

export default LatestJobCard
