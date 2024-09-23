import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Chip from '@mui/material/Chip';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { jobSliceActions } from '../redux/jobSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GET_JOB } from '../../../backend/utils/constant';


function JobDescription() {


    const params = useParams()
    const jobId = params.id

    let { user } = useSelector(store => store.auth)

    const dispatch = useDispatch()



    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await fetch(`https://jobportel.onrender.com/api/v1/job/get/${jobId}`, {
                    credentials: 'include'
                })
                let data = await res.json()

                if (data.success) {

                    dispatch(jobSliceActions.setSingleJob(data.job))
                    setIsApplied(data.job.applications.some(application => application.applicant == user?._id))
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchSingleJob()
    }, [jobId, dispatch, user?._id])

    let { singleJob } = useSelector(store => store.job)
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant == user?._id) || false
    const [isApplied, setIsApplied] = useState(isInitiallyApplied)

    const applyJobHandler = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/v1/application/apply/${jobId}`, {
                credentials: 'include'
            })

            let data = await res.json()
            if (data.success) {
                setIsApplied(true)
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(jobSliceActions.setSingleJob(updatedSingleJob))
                toast.success("You Applied Succefully")
            }
        } catch (error) {
            console.log(error)
        }



    }
    return (
        <>
            <Navbar />


            <div className='max-w-7xl mx-auto '>
                <div className='flex justify-between mt-10 items-center '>
                    <div className='text-left'>
                        <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                        <div className='flex items-center justify-center gap-2 mt-4 '>
                            <Chip label=<span className='text-red-600'>{singleJob?.position}</span> />
                            <Chip label=<span className='text-purple-600'>{singleJob?.jobType}</span> />
                            <Chip label=<span className='text-blue-950'>{singleJob?.salary}</span> />
                        </div>
                    </div>
                    <div>

                        <button onClick={isApplied ? null : applyJobHandler} className={` py-1 px-2 rounded-md  text-lg text-white ${isApplied ? 'bg-blue-600 cursor-not-allowed' : 'bg-purple-500'}`}>{isApplied ? 'Already Applied' : 'Apply Now'} </button>
                    </div>
                </div>

                <div className='w-full text-left'>
                    <h1 className='border-b-gray-300 font-medium py-5'>Job Description</h1>
                </div>
                <hr className='my-2' />
                <div className='text-left my-4'>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience}</span></h1>
                    <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
                    <h1 className='font-bold my-1'>Total Application: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications.length}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                </div>

            </div>
        </>
    )
}


export default JobDescription
