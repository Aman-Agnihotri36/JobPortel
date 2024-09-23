import React, { useState } from 'react';
import { useSelector } from 'react-redux';


function AppliedJobTable() {

    const { appliedJobsByStudent } = useSelector(store => store.job)


    return (
        <div className="container min-w-[5%] sm:mx-auto flex justify-center my-2 ">
            <table className="sm:min-w-full  bg-white border-collapse">
                <thead>
                    <tr className="border-b-2 border-gray-300">
                        <th className="sm:px-6 px-4 py-4 text-left">Date</th>
                        <th className="sm:px-6 px-4 py-4 text-left">Job Role</th>
                        <th className="sm:px-6 px-4 py-4 text-left">Company</th>
                        <th className="sm:px-6 px-4 py-4 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !appliedJobsByStudent ? <span>You have not applied any Job yet</span> : appliedJobsByStudent.map((appliedJob) => (
                            <tr key={appliedJob._id} className="border-b border-gray-300">
                                <td className="sm:px-6 px-4 py-4 text-left">{appliedJob.createdAt.split("T")[0]}</td>
                                <td className="sm:px-6 px-4 py-4 text-left">{appliedJob?.job?.title}</td>
                                <td className="sm:px-6 px-4 py-4 text-left">{appliedJob?.job?.company?.name}</td>
                                <td className="sm:px-6 px-4 py-4 text-left">
                                    <button className={`rounded-md p-2 py-1 text-white  ${appliedJob?.status == 'rejected' ? 'bg-red-400' : appliedJob.status == 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status} </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    )

}

export default AppliedJobTable
