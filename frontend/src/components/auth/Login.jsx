import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '../shared/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authSliceActions } from '../../redux/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { USER_AUTH } from '../../../../backend/utils/constant';




export default function SlotPropsLogIn() {

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const { user } = useSelector((store) => store.auth)

    const [isCheckedOne, setIsCheckedOne] = useState(false);
    const [isCheckedTwo, setIsCheckedTwo] = useState(false);

    function handleCheckedOne() {
        setIsCheckedOne(!isCheckedOne)
        setIsCheckedTwo(false)
    }
    function handleCheckedTwo() {
        setIsCheckedTwo(!isCheckedTwo)
        setIsCheckedOne(false)
    }

    let [item, setItem] = useState({
        email: "",
        password: ""
    })

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
        const data = Object.fromEntries(formData.entries());
        try {
            dispatch(authSliceActions.setLoading(true))


            const item = await fetch(`${USER_AUTH}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                credentials: 'include',

                body: JSON.stringify(data),
            })

            const result = await item.json();

            if (result.success) {
                dispatch(authSliceActions.setUser(result.user));
                dispatch(authSliceActions.setLoading(false))
                toast.success("Login Successful")
                navigate("/")
            }

        } catch (error) {
            console.log(error)
        }

        finally {
            dispatch(authSliceActions.setLoading(false))
        }

        setItem({ email: "", password: "" })
        setIsCheckedOne(false)
        setIsCheckedTwo(false)
    }



    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [])

    return (
        <div>
            <Navbar></Navbar>

            <div className='w-full   flex justify-center items-center '>
                <div className="login w-[75%]  border border-gray-200 rounded-md  my-10 p-8">
                    <div className="hader">
                        <span>Welcome Back!</span>
                        <p>Get back to your Account.</p>
                    </div>
                    <form onSubmit={submitForm} >

                        <input type="email" name='email' value={item.email} onChange={(e) => setItem({ email: e.target.value })} placeholder="Enter Emaill" required />

                        <input type="password" name='password' value={item.password} onChange={(e) => setItem({ password: e.target.value })} placeholder="Enter Password" required />

                        <div className='flex gap-4 items-center'>

                            <div className="checkbox-wrapper-46">
                                <input type="checkbox" onClick={handleCheckedOne} checked={isCheckedOne} name='role' value='student' id="cbx-46" className="inp-cbx" />
                                <label htmlFor="cbx-46" className="cbx"
                                ><span>
                                        <svg viewBox="0 0 12 10" height="10px" width="12px">
                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span
                                    ><span>Student</span>
                                </label>
                            </div>


                            <div className="checkbox-wrapper-47">
                                <input type="checkbox" onClick={handleCheckedTwo} checked={isCheckedTwo} name='role' value='recruiter' id="cbx-47" className="inp-cbx" />
                                <label htmlFor="cbx-47" className="cbx"
                                ><span>
                                        <svg viewBox="0 0 12 10" height="10px" width="12px">
                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span
                                    ><span>Recruiter</span>
                                </label>
                            </div>



                        </div>

                        {loading ? <button className='bg-purple-500  rounded-md font-bold text-lg text-white'><CircularProgress disableShrink /></button> : <button className='bg-purple-500 py-2 rounded-md font-bold text-lg text-white'>Login</button>}

                        <span> Don't have an account? <Link to='/signup'>SignUp</Link></span>
                    </form>


                </div>

            </div >
        </div >
    );
}


