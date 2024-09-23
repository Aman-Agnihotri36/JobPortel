import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { companySliceActions } from '../../redux/companySlice';
import Footer from '../Footer';
function CreateCompany() {
    const navigate = useNavigate()
    const [companyName, setCompanyName] = useState()
    const dispatch = useDispatch()

    const registerNewCompany = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/v1/company/register`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // This should be set
                },
                body: JSON.stringify({ companyName })
            })

            const data = await res.json()

            if (data?.success) {
                dispatch(companySliceActions.setSingleCompany(data.company))

                const companyId = data.company._id

                navigate(`/admin/companies/${companyId}`)
            }

        } catch (error) {
            console.log(error)
        }


    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto text-left'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give our company name? you can change this later.</p>
                </div>
                <label htmlFor="CompanyName">Company Name</label>
                <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} id='CompanyName' className='my-2' placeholder="JobHunt, Microsoft etc" />

                <div className='flex items-center gap-2 my-10'>
                    <Button onClick={() => navigate('/admin/companies')} className='text-[1rem]'>Cancel</Button>
                    <Button onClick={registerNewCompany} className='bg-purple-500  text-[1rem]' type="primary">Continue</Button>
                </div>
            </div>
            <div className='absolute bottom-0 w-full'>
                <Footer />
            </div>
        </div>
    )
}

export default CreateCompany
