import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantTable from './ApplicantTable'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { applicantSliceAction } from '../../redux/applicationSlice'
import { APPLI } from '../../../../backend/utils/constant'
import Footer from '../Footer'

function Applicants() {





    const params = useParams()
    const dispatch = useDispatch()


    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await fetch(`https://jobportel.onrender.com/api/v1/application/${params.id}/applicants`, {
                    credentials: 'include'
                })

                let data = await res.json()

                const app = data.job.applications
                dispatch(applicantSliceAction.setApplicants(app))


            } catch (error) {
                console.log(error)
            }
        }
        fetchAllApplicants()
    }, [])

    const { applicants } = useSelector(store => store.application)
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto text-left '>
                <h1 className='text-xl font-bold my-5'>Applicants ({applicants?.length})</h1>
                <ApplicantTable />
            </div>

        </div>
    )
}

export default Applicants
