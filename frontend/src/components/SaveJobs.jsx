import React from 'react'
import Navbar from './shared/Navbar'
import { useSelector } from 'react-redux'

import SaveSingleJob from './SaveSingleJob'
import Footer from './Footer'

function SaveJobs() {

    const { saveJobs } = useSelector(store => store.job)


    return (
        <div>
            <Navbar />

            <div className=' mt-6   max-w-7xl mx-auto  '>
                <h1 className='text-xl font-bold text-left ml-7'>Your Save Jobs ({saveJobs.length})</h1>
                <div className='flex flex-wrap justify-center sm:justify-start mt-8  gap-8  w-full mx-auto '>
                    {
                        saveJobs.map((job) => (
                            <div key={job._id} className='sm:w-[31%] w-[350px]'>
                                <SaveSingleJob Job={job} />
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default SaveJobs
