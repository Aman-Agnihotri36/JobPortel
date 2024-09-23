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
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>

                                            <LogoutOutlinedIcon />
                                            <Button onClick={logoutHandler} href="#text-buttons">Logout</Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <PersonOutlineOutlinedIcon />
                                            <Button href="#text-buttons"><Link to='/profile'>View Profile</Link></Button>
                                        </div>
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
                                    </>
                                )
                            }

                        </div>





                    </div>
                    {
                        user && user.role == 'recruiter' ? (
                            <>

                                <Link to='/admin/companies'><Button className='cursor-pointer'>Companies</Button></Link>
                                <Link to='/admin/jobs'><Button className='cursor-pointer'>Jobs</Button></Link>
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
