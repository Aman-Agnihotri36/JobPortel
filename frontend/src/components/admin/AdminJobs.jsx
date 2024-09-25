import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button, Input } from 'antd';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs';
import { jobSliceActions } from '../../redux/jobSlice';
import Footer from '../Footer';

function AdminJobs() {
    useGetAllAdminJobs()

    const navigate = useNavigate()
    const [input, setInput] = useState()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(jobSliceActions.setsearchAdminJobsByText(input))
    }, [input])

    return (
        <div >
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 '>
                <div className='flex items-center justify-between'>
                    <Input onChange={(e) => setInput(e.target.value)} className='w-fit' placeholder="Filter by name" />
                    <Button className='bg-purple-500 font-bold text-[1rem]' onClick={() => navigate("/admin/jobs/create")} type="primary">New Job</Button>
                </div>
                <AdminJobsTable />
            </div>

        </div>
    )
}

export default AdminJobs
