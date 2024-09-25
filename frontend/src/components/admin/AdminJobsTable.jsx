
import React, { useEffect, useState } from 'react'
import BasicPopover2 from '../shared/Popover2';

import { useSelector } from 'react-redux';


let people = true

function AdminJobsTable() {
    const Application = true


    // const { companies, searchCompanyByText } = useSelector(store => store.company)
    const { allAdminJobs, searchAdminJobsByText } = useSelector(store => store.job)

    const [filterAdminJobs, setFilterAdminJobs] = useState(allAdminJobs)

    useEffect(() => {
        const filteredAdminJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchAdminJobsByText) {
                return true
            }
            return job?.title?.toLowerCase().includes(searchAdminJobsByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchAdminJobsByText.toLowerCase())
        })
        setFilterAdminJobs(filteredAdminJobs)
    }, [allAdminJobs, searchAdminJobsByText])

    return (
        <div className="container mx-auto my-2">
            <table className="min-w-full bg-white border-collapse">

                <thead>
                    <tr className="border-b-2 border-gray-300">
                        <th className="sm:px-6 sm:py-4 text-left">Company Name</th>
                        <th className="sm:px-6 sm:py-4 text-left">Role</th>
                        <th className="sm:px-6 sm:py-4 text-left">Date</th>
                        <th className="sm:px-6 sm:py-4 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filterAdminJobs.length <= 0 ? <span className='relative left-72 top-10' >You haven't registered any Job yet</span> : (
                        <>
                            {filterAdminJobs.map((job) => (
                                <tr key={job._id} className="border-b border-gray-300">
                                    <td className="sm:px-6 sm:py-4 text-left">{job?.company?.name}</td>
                                    <td className="sm:px-6 sm:py-4 text-left">{job?.title}</td>
                                    <td className="sm:px-6 sm:py-4 text-left">  {job?.createdAt.split("T")[0]}</td>
                                    <td className="sm:px-6 sm:py-4 text-left">
                                        <BasicPopover2 JobId={job._id} People={people} Application={Application} Company={job?._id} />
                                    </td>
                                </tr>
                            ))}
                        </>
                    )}

                </tbody>
            </table>
        </div>
    )
}

export default AdminJobsTable
