import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import SingleJob from './SingleJob'
import { useDispatch, useSelector } from 'react-redux'
import { jobSliceActions } from '../redux/jobSlice'
import useGetAllJobs from '../hooks/useGetAllJobs'
import Footer from './Footer'

function Browse() {
    useGetAllJobs()
    const { allJobs } = useSelector(store => store.job)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(jobSliceActions.setSearchQuery(""))
        }
    })
    return (
        <div className='w-full m-0 p-0'>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <div >
                    <h1 className='sm:text-left text-left  sm:ml-1  font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                    <div className=' flex  justify-center sm:justify-start flex-wrap gap-10 '>
                        {
                            allJobs.map((job) => (
                                <SingleJob key={job._id} Job={job} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Browse
