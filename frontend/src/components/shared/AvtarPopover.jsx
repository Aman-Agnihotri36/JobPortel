import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authSliceActions } from '../../redux/auth';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { USER_AUTH } from '../../../../backend/utils/constant';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BusinessIcon from '@mui/icons-material/Business';



export default function BasicPopover() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.auth)



    const logoutHandler = async () => {
        try {

            const item = await fetch(`https://jobportel.onrender.com/api/v1/user/logout`, {
                method: 'GET',
                credentials: 'include'
            })

            const result = await item.json();

            if (result.success) {
                dispatch(authSliceActions.setUser(null))
                toast.success("Logout Successfully")
                navigate("/")
            }

        } catch (error) {
            console.log(error)
        }
    }

    const SaveJob = () => {
        navigate('/saveJobs')
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>


            <div aria-describedby={id} variant="contained" onClick={handleClick} className='cursor-pointer'>
                {user?.profile?.profilePhoto ? <img className='w-[47px] h-[47px] rounded-full' src={user?.profile?.profilePhoto} /> : <Avatar />}
            </div>


            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>
                    <div className='flex gap-4 '>
                        {user?.profile?.profilePhoto ? <img className='w-[47px] h-[47px] shadow-md rounded-full' src={user?.profile?.profilePhoto} /> : <Avatar />}
                        <div>
                            <h4 className='font-medium'>{user?.fullname}</h4>
                            <p className='text-sm text-muted-foreground'> {user?.profile?.bio}</p>
                        </div>

                    </div>

                    <div className='flex flex-col my-2 text-gray-600'>
                        <div className='flex w-fit items-center gap-2 cursor-pointer'>

                            {
                                user && user.role == 'recruiter' ? (
                                    <>

                                    </>
                                ) : (
                                    <>
                                        <PersonOutlineOutlinedIcon />
                                        <Button href="#text-buttons"><Link to='/profile'>View Profile</Link></Button>
                                    </>
                                )
                            }

                        </div>

                        <div className='flex w-fit items-center gap-2 cursor-pointer'>

                            <HomeIcon />
                            <Button onClick={navigate('/')} href="#text-buttons">Home</Button>
                        </div>
                        <div className='flex w-fit items-center gap-2 cursor-pointer'>

                            <WorkIcon />
                            <Button onClick={navigate('/jobs')} href="#text-buttons">Jobs</Button>
                        </div>
                        <div className='flex w-fit items-center gap-2 cursor-pointer'>

                            <TravelExploreIcon />
                            <Button onClick={navigate('/browse')} href="#text-buttons">Browse</Button>
                        </div>
                        <div className='flex w-fit items-center gap-2 cursor-pointer'>

                            <LogoutOutlinedIcon />
                            <Button onClick={logoutHandler} href="#text-buttons">Logout</Button>
                        </div>


                    </div>
                    {
                        user && user.role == 'recruiter' ? (
                            <>
                                <div className='flex w-fit items-center gap-2 cursor-pointer'>

                                    <BusinessIcon />
                                    <Button onClick={navigate('/admin/companies')} href="#text-buttons">Companies</Button>
                                </div>

                                <div className='flex w-fit items-center gap-2 cursor-pointer'>

                                    <WorkIcon />
                                    <Button onClick={navigate('/admin/jobs')} href="#text-buttons">Jobs</Button>
                                </div>


                            </>
                        ) : (
                            <div className='flex items-center gap-2'>
                                <BookmarkBorderIcon />
                                <Button onClick={SaveJob}>SaveJobs</Button>
                            </div>
                        )
                    }
                </Typography>
            </Popover>
        </div >
    );
}
