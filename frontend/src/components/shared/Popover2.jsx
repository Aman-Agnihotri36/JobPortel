import * as React from 'react';
import Popover from '@mui/material/Popover';

import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditRoundedIcon from '@mui/icons-material/EditRounded';



export default function BasicPopover2({ ApplicantId, Status, JobId, Application, Company }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.auth)


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const onClickHandler = async (one, ApplicantId) => {

        try {
            const res = await fetch(`http://localhost:8000/api/v1/application/status/${ApplicantId}/update`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: one }),
            })

            const data = await res.json()


        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>


            <div aria-describedby={id} variant="contained" onClick={handleClick} className='cursor-pointer'>
                <MoreHorizIcon />
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
                    <div className='flex bg-white items-center justify-center gap-4 w-fit cursor-pointer'>
                        {
                            !Application ? (
                                <>

                                    < button onClick={() => navigate(`/admin/companies/${Company}`)} className='p-2 py-0 rounded-xl    hover:bg-gray-200'><EditRoundedIcon /> Edit</button >
                                </>
                            ) : (
                                <>

                                    < button onClick={() => navigate(`/admin/jobs/${JobId}/applicant`)} className='p-2 py-0 rounded-xl   hover:bg-gray-200'><RemoveRedEyeIcon /> Applicants </button >

                                </>
                            )


                        }

                        {

                            !Status ? null : Status.map((one, index) => (
                                < button key={index} onClick={() => onClickHandler(one, ApplicantId)} className='p-2 py-0 rounded-xl    hover:bg-gray-200'> {one}</button >
                            ))

                        }
                    </div>


                </Typography>
            </Popover>
        </div>
    );
}
