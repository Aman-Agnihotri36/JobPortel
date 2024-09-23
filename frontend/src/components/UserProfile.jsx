
import Navbar from './shared/Navbar'
import Avatar from '@mui/material/Avatar';

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import Chip from '@mui/material/Chip';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '../hooks/useGetApliedJob';
import Footer from './Footer';



function UserProfile() {


    useGetAppliedJobs()

    //const Skills = ['Html', 'Css', 'JavaScript', 'React']

    let { user } = useSelector(store => store.auth)


    return (
        <div>
            <Navbar />
            <div className='sm:max-w-4xl sm:mx-auto bg-white border border-gray-200 rounded-2xl my-7 mx-4 p-4 sm:p-8'>
                <div className='flex justify-between'>
                    <div className='flex  items-center gap-6'>
                        <Avatar alt="Remy Sharp" src={user?.profile?.profilePhoto} />
                        <div className='text-left'>
                            <h1 className='font-medium text-xl '>{user?.fullname}</h1>
                            <p className='hidden sm:block'>{user?.profile?.bio}</p>
                        </div>

                    </div>
                    <UpdateProfileDialog />
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <EmailRoundedIcon />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <CallRoundedIcon />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                <div className='text-left my-5'>
                    <h1>Skills</h1>
                    <div className='flex flex-wrap items-center gap-1 my-1 '>
                        {
                            user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => (
                                <Chip key={index} label=<span className='text-red-600'>{item}</span> />
                            )) : <span>NA</span>
                        }
                    </div>
                </div>

                <div className='grid w-full max-w-sm items-center text-left gap-1.5'>
                    <h1>Resume</h1>
                    {
                        user ? <a className='text-blue-500 w-full hover:underline cursor-pointer' target='blank' href={user?.profile?.resumeOriginalName}>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>


            </div>

            <div className='sm:max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='text-left font-bold text-lg my-5 ml-3'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <Footer />
        </div>
    )
}

export default UserProfile
