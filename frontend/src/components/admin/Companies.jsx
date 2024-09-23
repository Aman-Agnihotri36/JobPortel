import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button, Input } from 'antd';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { companySliceActions } from '../../redux/companySlice';
import useGetAllCompany from '../../hooks/useGetAllCompnies';
import Footer from '../Footer';

function Companies() {
    useGetAllCompany()
    const navigate = useNavigate()
    const [input, setInput] = useState()
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(companySliceActions.setSearchCompanyByText(input))
    }, [input])

    return (
        <div >
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 '>
                <div className='flex items-center justify-between'>
                    <Input onChange={(e) => setInput(e.target.value)} className='w-fit' placeholder="Filter by name" />
                    <Button className='bg-purple-500 font-bold text-[1rem]' onClick={() => navigate("/admin/companies/create")} type="primary">New Company</Button>
                </div>
                <CompaniesTable />
            </div>
            <Footer />
        </div>
    )
}

export default Companies
