import React from 'react'
import { useState } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useDispatch, useSelector } from 'react-redux';
import { authSliceActions } from '../redux/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { USER_AUTH } from '../../../backend/utils/constant';

function UpdateProfileDialog() {
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth)
    const [formData, setFormData] = useState({
        fullname: user?.fullname,  //if user exists than excess its fullname
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills,
        file: user?.profile?.resume
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((preValue) => ({
            ...preValue,
            [name]: value
        }))
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0]
        setFormData({ ...formData, file })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        try {

            const item = await fetch(`https://jobportel.onrender.com/api/v1/user/updateProfile`, {
                method: 'POST',


                body: formData,

                credentials: 'include'
            })
            const result = await item.json();

            if (result.success) {
                dispatch(authSliceActions.setUser(result.user))


                toast.success("Profile Updated Successfully")
            }



        } catch (error) {
            console.log(error)
        }

        setOpen(false); // Close the modal after submission
    }



    return (
        <>
            {/* Button to open the modal */}


            < button onClick={() => setOpen(true)} className='bg-gray-100 p-2 py-0 rounded-xl h-[47px]  hover:bg-gray-200'><EditRoundedIcon /></button >

            {/* Modal Dialog */}
            {
                open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Update Form</h2>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Update Form */}
                            <form onSubmit={handleSubmit} enctype="multipart/form-data">
                                <div className='flex justify-around items-center '>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        id="name"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        className="mt-1 block w-[80%]  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className='flex justify-around items-center '>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-[80%]  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className='flex justify-around items-center '>
                                    <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                                        Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        id="number"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className="mt-1 block w-[80%]  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className='flex justify-around items-center '>
                                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                                        Bio
                                    </label>
                                    <input
                                        type="text"
                                        name="bio"
                                        id="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        className="mt-1 block w-[80%]  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"

                                    />
                                </div>
                                <div className='flex justify-around items-center '>
                                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                                        Skills
                                    </label>
                                    <input
                                        type="text"
                                        name="skills"
                                        id="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        className="mt-1 block w-[80%]  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"

                                    />
                                </div>
                                <div className='flex justify-around items-center '>
                                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                                        Resume
                                    </label>
                                    <input
                                        type="file"
                                        name="resume"
                                        id="resume"

                                        onChange={fileChangeHandler}
                                        className="mt-1 block w-[80%] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"

                                    />
                                </div>

                                <div className="flex justify-end ">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default UpdateProfileDialog
