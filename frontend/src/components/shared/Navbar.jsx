import React from 'react'
import BasicPopover from './AvtarPopover'
import Button from '@mui/material/Button';
import CustomizedButtons from './Button';
import { Link } from 'react-router-dom';
import Browse from '../Browse';
import { useSelector } from 'react-redux';
import AccountMenu from './Hamburger';
import SimplePopover from './Hamburger';

function Navbar() {

    const { user } = useSelector(store => store.auth)
    return (



        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto  max-w-7xl h-8'>
                <div>
                    <h1 className='text-2xl pl-3 pt-3 font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>

                <div className=' hidden sm:flex items-center gap-12 '>
                    <ul className='flex   font-medium items-center gap-5'>
                        {
                            user && user.role == 'recruiter' ? (
                                <>
                                    <Link to='/admin/companies'><li className='cursor-pointer'>Companies</li></Link>
                                    <Link to='/admin/jobs'><li className='cursor-pointer'>Jobs</li></Link>
                                </>
                            ) : (
                                <>
                                    <Link to='/'><li className='cursor-pointer'>Home</li></Link>
                                    <Link to='/jobs'><li className='cursor-pointer'>Jobs</li></Link>
                                    <Link to='/browse'><li className='cursor-pointer'>Browse</li></Link>
                                </>
                            )




                        }

                    </ul>

                    {!user ? <div className='flex items-center gap-2'>

                        <Link to="/login"><Button className='bg-[#6A38C2]' variant="black">Login</Button></Link>
                        <Link to="/signup"><CustomizedButtons></CustomizedButtons></Link>
                    </div> : (<BasicPopover></BasicPopover>)

                    }
                </div>

                {
                    !user ? (
                        <div className='block pr-3 pt-3   sm:hidden'>
                            <SimplePopover />

                        </div>
                    ) : (
                        <div className='sm:hidden mt-4 mr-4 block'>
                            <BasicPopover></BasicPopover>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

// Since Link avoids full page reloads, the application feels faster and more responsive. Only the components that need to change are re-rendered, rather than reloading the entire page.

export default Navbar
