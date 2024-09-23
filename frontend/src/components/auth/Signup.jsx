import React from 'react'
import Navbar from '../shared/Navbar'
import './Signup.css'
import '../CssFile/Checkbox.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { authSliceActions } from '../../redux/auth'
import { CircularProgress } from '@mui/material'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import { USER_AUTH } from '../../../../backend/utils/constant'

export default function SlotPropsSignIn() {
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const { loading } = useSelector((store) => store.auth)


    useEffect(() => {


        // Cleanup function to reset loading state when component unmounts
        return () => {
            dispatch(authSliceActions.setLoading(false)); // Clear loading state
        };
    }, [loading, dispatch]);


    const submitForm = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        // const data = Object.fromEntries(formData.entries());
        try {
            dispatch(authSliceActions.setLoading(true))
            const item = await fetch(`${USER_AUTH}/register`, {
                method: 'POST',


                // body: JSON.stringify(data),
                body: formData
            })
            const result = await item.json();

            if (result.success) {
                dispatch(authSliceActions.setLoading(false))
                toast.success("You Registered Succefully")
                navigate("/login")

            }


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Navbar></Navbar>

            <div className='sm:max-w-[75%] w-[77%] mx-auto flex justify-center items-center'>
                <div className="login w-[100%]  border border-gray-200 rounded-md  my-10 p-8">
                    <div className="hader">
                        <span>Join us today!</span>
                        <p>Sing up now to become a member.</p>
                    </div>
                    <form onSubmit={submitForm} >
                        <input type="text" name='fullname' placeholder="Enter Name" required="" />
                        <input type="email" name='email' placeholder="Enter Emaill" required="" />
                        <input type="text" name='phoneNumber' placeholder="Enter a Phone No" required="" />
                        <input type="password" name='password' placeholder="Enter Password" required="" />

                        <div className='flex  flex-wrap gap-4 items-center'>

                            <div className='flex gap-4'>
                                <div className="checkbox-wrapper-46">
                                    <input type="checkbox" name='role' value='student' id="cbx-46" className="inp-cbx" />
                                    <label htmlFor="cbx-46" className="cbx"
                                    ><span>
                                            <svg viewBox="0 0 12 10" height="10px" width="12px">
                                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span
                                        ><span>Student</span>
                                    </label>
                                </div>



                                <div className="checkbox-wrapper-47 flex items-center">
                                    <input type="checkbox" name='role' value='recruiter' id="cbx-47" className="inp-cbx" />
                                    <label htmlFor="cbx-47" className="cbx"
                                    ><span>
                                            <svg viewBox="0 0 12 10" height="10px" width="12px">
                                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span
                                        ><span>Recruiter</span>
                                    </label>
                                </div>

                            </div>
                            < div className='flex   gap-4 sm:ml-8 items-center sm:gap-6 '>
                                <label htmlFor='upload'>Profile</label>
                                <input

                                    type="file"
                                    accept='image/*'
                                    className=' cursor-pointer w-full'
                                    id='upload'
                                    name='profilePhoto'
                                />
                            </div>
                        </div>



                        {/* <input className='cursor-pointer' type="button" value="Signup" />  */}
                        {loading ? <button className='bg-purple-500  rounded-md font-bold text-lg text-white'><CircularProgress disableShrink /></button> : <button className='bg-purple-500 py-2 rounded-md font-bold text-lg text-white'>SignUp</button>}
                        <span> Already a member? <Link to='/login'>Login here</Link></span>
                    </form>


                </div>

            </div>
        </>
    );
}

