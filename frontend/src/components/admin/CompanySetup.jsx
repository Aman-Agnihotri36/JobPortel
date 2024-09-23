import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../../hooks/useGetCompanyById';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer';

function CompanySetup() {
    const { singleCompany } = useSelector(store => store.company)

    const params = useParams()

    const navigate = useNavigate()

    useGetCompanyById(params.id)
    const [Input, setInput] = useState({
        companyName: '',
        description: '',
        website: '',
        location: '',
        logo: null,
    });


    const handleChange = (e) => {
        setInput({
            ...Input,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setInput({
            ...Input,
            logo: e.target.files[0],  // Store the file object
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here

        const formData = new FormData(e.target);

        try {

            const item = await fetch(`https://jobportel.onrender.com/api/v1/company/update/${params.id}`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            })

            const result = await item.json();
            if (result.success) {

                toast.success("Company Info Registered")
                navigate('/admin/companies');

            }



        } catch (error) {
            console.log(error)
        }


    };

    useEffect(() => {

        setInput({
            companyName: singleCompany?.name || '',
            description: singleCompany?.description || '',
            website: singleCompany?.website || '',
            location: singleCompany?.location || '',
            logo: null,
        })
    }, [singleCompany])


    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex   sm:items-center justify-center ">  {/* Background color change */}
                <div className="bg-white p-10 rounded shadow-md w-full max-w-4xl">
                    <div className='flex gap-10  justify-start items-center'>
                        <button onClick={() => navigate('/admin/companies/create')} className='bg-gray-100 text-gray-600 rounded-md px-3 py-2 '><KeyboardBackspaceIcon />Back</button>
                        <h2 className="text-2xl  mt-4 font-bold mb-6 text-center"> Company SetUp</h2>

                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">  {/* Two inputs per row */}
                            {/* Company Name */}
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={Input.companyName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter your company name"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={Input.description}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter a description"
                                    required
                                />
                            </div>

                            {/* Website */}
                            <div>
                                <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
                                <input
                                    type="text"
                                    id="website"
                                    name="website"
                                    value={Input.website}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="https://example.com"
                                    required
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={Input.location}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter the location"
                                    required
                                />
                            </div>
                        </div>

                        {/* Logo Upload */}
                        <div>
                            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Company Logo</label>
                            <input
                                type="file"
                                id="logo"
                                name="logo"
                                onChange={handleFileChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        {/* Update Button */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white py-3 px-4 rounded-md shadow-sm hover:bg-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-lg">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CompanySetup