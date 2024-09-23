import React from 'react'
import Navbar from '../shared/Navbar'
import { useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer';


function NewAdminPost() {
    const { companies } = useSelector(store => store.company)




    const navigate = useNavigate()

    const [Input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: 0,
        companyId: ''
    });


    const handleChange = (e) => {
        setInput({
            ...Input,
            [e.target.name]: e.target.value,
        });
    };

    const selectChangeHandler = (e) => {

        const selectdCompany = companies.find((company) => company.name.toLowerCase() == e.target.value)

        setInput({
            ...Input, companyId: selectdCompany._id
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here



        try {

            const item = await fetch(`https://jobportel.onrender.com/api/v1/job/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(Input)
            })

            const result = await item.json();
            if (result.success) {

                toast.success("Job Registered Succefully")
                navigate('/admin/jobs')
            }



        } catch (error) {
            console.log(error)
        }


    };




    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center ">  {/* Background color change */}
                <div className="bg-white p-10 rounded shadow-md w-full max-w-4xl">
                    <div className='flex gap-10  justify-start items-center'>
                        <button onClick={() => navigate('/admin/jobs')} className='bg-gray-100 text-gray-600 rounded-md px-3 py-2 '><KeyboardBackspaceIcon />Back</button>
                        <h2 className="text-2xl  mt-4 font-bold mb-6 text-center"> Company SetUp</h2>

                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">  {/* Two inputs per row */}
                            {/* Company Name */}
                            <div>
                                <label htmlFor="title" className="block text-left  text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={Input.title}
                                    onChange={handleChange}
                                    className="mt-1 block w-full  p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter company Title"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-left text-sm font-medium text-gray-700">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={Input.description}
                                    onChange={handleChange}
                                    className="mt-1 block w-full  p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter description"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="requirements" className="block text-left text-sm font-medium text-gray-700">Requirements</label>
                                <input
                                    type="text"
                                    id="requirements"
                                    name="requirements"
                                    value={Input.requirements}
                                    onChange={handleChange}
                                    className="mt-1 block w-full  p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter your requirements"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="salary" className="block text-left text-sm font-medium text-gray-700">Salary</label>
                                <input
                                    type="number"
                                    id="salary"
                                    name="salary"
                                    value={Input.salary}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter salary"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-left text-sm font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={Input.location}
                                    onChange={handleChange}
                                    className="mt-1 block  w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter your company location"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="jobType" className="block text-sm text-left font-medium text-gray-700">JobType</label>
                                <input
                                    type="text"
                                    id="jobType"
                                    name="jobType"
                                    value={Input.jobType}
                                    onChange={handleChange}
                                    className="mt-1 block  w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter a jobType"
                                    required
                                />
                            </div>

                            {/* Website */}
                            <div>
                                <label htmlFor="experience" className="block text-left text-sm font-medium text-gray-700">Experience</label>
                                <input
                                    type="number"
                                    id="experience"
                                    name="experience"
                                    value={Input.experience}
                                    onChange={handleChange}
                                    className="mt-1 block w-full  p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter job Experience"
                                    required
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label htmlFor="position" className="block text-left text-sm font-medium text-gray-700">Position</label>
                                <input
                                    type="number"
                                    id="position"
                                    name="position"
                                    value={Input.position}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2  border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter the position"
                                    required
                                />
                            </div>

                            <div>

                                {companies.length >= 0 && (
                                    <select onChange={selectChangeHandler} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300">
                                        <option value="" disabled selected hidden>Select an Company</option>
                                        {
                                            companies.map((one, index) => (
                                                <option key={index} value={one?.name.toLowerCase()}>{one.name}</option>
                                            ))
                                        }
                                    </select>
                                )}
                            </div>
                        </div>



                        {/* Update Button */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full  bg-purple-600 text-white py-3 px-4 rounded-md shadow-sm hover:bg-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-lg">
                                Create Job
                            </button>
                            {companies.length <= 0 && <p className='text-sm mt-2 text-red-600'>*Please register a company first before posting a job</p>}
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NewAdminPost