import React from 'react'
import LatestJobCard from './shared/LatestJobCard'
import { useSelector } from 'react-redux'


function LatestJob() {



    const { allJobs } = useSelector(store => store.job)


    return (

        <div className='flex flex-wrap flex-col items-start mx-auto my-20'>
            <h1 className='sm:text-4xl text-3xl ml-4 sm:ml-[8%] font-bold'><span className='text-[#6A38C2]'>Latest & Top</span> Job Openings</h1>
            <div className=' flex gap-7 sm:justify-start justify-center flex-wrap  w-full sm:pl-[8%]   my-5'>
                {
                    allJobs.length != 0 ? allJobs?.slice(0, 6).map((job) => <LatestJobCard key={job._id} Job={job} />) : <span>No Jobs Available</span>
                }
            </div>


        </div>
    )
}

export default LatestJob
