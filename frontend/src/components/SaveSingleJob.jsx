import React from 'react'

import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { jobSliceActions } from '../redux/jobSlice';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SaveSingleJob({ Job }) {

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime)
        const currentTime = new Date()
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
    }


    const navigate = useNavigate()

    const dispatch = useDispatch()




    const handleRemove = () => {

        dispatch(jobSliceActions.removeSaveJob(Job._id))
        toast.success("Job Remove Successfully")
    }

    return (
        <div className=' p-5   rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>

                <p className='text-sm text-gray-500'>{daysAgoFunction(Job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(Job?.createdAt)} days ago`}</p>
                <span onClick={handleRemove}><CloseIcon /></span>
            </div>
            <div className='flex gap-2  my-2'>
                <button>
                    <Avatar alt="Remy Sharp" src={Job?.company?.logo} />
                </button>

                <div>
                    <h1 className='font-medium text-lg'>{Job?.company?.name}</h1>
                    <p className='text-left text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div className='text-left'>
                <h1 className='font-bold text-lg my-2'>{Job?.title}</h1>
                <p className='text-sm text-gray-600'>{Job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Chip label=<span className='text-red-600'>{Job?.position}</span> />
                <Chip label=<span className='text-purple-600'>{Job?.jobType}</span> />
                <Chip label=<span className='text-blue-950'>{Job?.salary}</span> />
            </div>

            <div className='text-left my-3'>
                <button onClick={() => navigate(`/description/${Job?._id}`)} className='bg-gray-200 py-1 px-2 rounded-md mx-3 text-lg text-black'>Details</button>

            </div>
        </div>
    )
}

export default SaveSingleJob
