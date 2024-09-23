import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import SingleJob from './SingleJob'
import { useSelector } from 'react-redux'

import Draw from './shared/Drawer'
import Footer from './Footer'


function Jobs() {

    let { allJobs, searchedQuery } = useSelector(store => store.job)

    const [filterJobs, setFilterJobs] = useState(allJobs)

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.jobType.toLowerCase().includes(searchedQuery.toLowerCase())

            })
            setFilterJobs(filteredJobs)

        } else {
            setFilterJobs(allJobs)
        }
    }, [searchedQuery, allJobs])

    return (
        <div className='w-full'>
            <Navbar />

            <div className='sm:max-w-[90%]  sm:mx-10 mt-5 '>
                <div className='sm:flex sm:gap-5'>
                    <div className='w-[15%] hidden sm:block'>
                        <FilterCard />
                    </div>
                    <div className=' ml-6 sm:hidden'>
                        <Draw />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex justify-start h-[88vh] mt-5 overflow-y-auto pb-5'>
                                <div className='flex  mt-5 justify-center sm:justify-start flex-wrap gap-3'>
                                    {
                                        filterJobs.map((job) => (



                                            <SingleJob Main={true} key={job._id} Job={job} />
                                        ))
                                    }
                                </div>
                            </div>

                        )

                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Jobs
