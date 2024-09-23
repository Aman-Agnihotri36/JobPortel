import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import Button from '@mui/material/Button';
import CustomizedButtons from './Button';
import { Avatar } from 'antd';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const SimplePopover = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { user } = useSelector(store => store.auth);

    return (
        <div className="relative inline-block text-left">
            {/* Button to trigger the popover */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none"
            >
                <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    className="cursor-pointer text-white"
                />
            </button>

            {/* Popover content */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <ul className='flex flex-col font-medium text-gray-700 items-center gap-3 p-4'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <Link to='/admin/companies'>
                                    <li className='cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-lg w-full text-center'>
                                        Companies
                                    </li>
                                </Link>
                                <Link to='/admin/jobs'>
                                    <li className='cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-lg w-full text-center'>
                                        Jobs
                                    </li>
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className='flex w-fit items-center gap-2 cursor-pointer'>

                                    <HomeIcon />
                                    <Link to='/'><Button >Home</Button></Link>
                                </div>
                                <div className='flex w-fit items-center gap-2 cursor-pointer'>

                                    <WorkIcon />
                                    <Link to='/jobs'><Button >Jobs</Button></Link>
                                </div>
                                <div className='flex w-fit items-center gap-2 cursor-pointer'>

                                    <TravelExploreIcon />
                                    <Link to='/browse'><Button >Browse</Button></Link>
                                </div>
                                <Link to="/login">
                                    <Button className='bg-[#6A38C2] text-white w-full rounded-lg' variant="contained" size="small">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <CustomizedButtons />
                                </Link>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SimplePopover;
