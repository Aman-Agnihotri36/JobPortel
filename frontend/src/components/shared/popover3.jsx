import * as React from 'react';
import Popover from '@mui/material/Popover';

import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { APPLI } from '../../../../backend/utils/constant';




export default function BasicPopover3({ Status, ApplicantId }) {
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
            const res = await fetch(`${APPLI}/status/${ApplicantId}/update`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: one }),
            })

            const data = await res.json()
            if (data.success) {
                toast.success("Application updated successfully")
            }


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




                        <div className='flex flex-col gap-1'>

                            {
                                !Status ? null : Status.map((one, index) => (
                                    < button key={index} onClick={() => onClickHandler(one, ApplicantId)} className='p-2 py-0 rounded-xl    hover:bg-gray-200'> {one}</button >
                                ))
                            }
                        </div>


                    </div>


                </Typography>
            </Popover>
        </div>
    );
}
