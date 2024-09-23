import React from 'react'
import { useSelector } from 'react-redux'
import BasicPopover2 from '../shared/Popover2'
import BasicPopover3 from '../shared/popover3';

function ApplicantTable() {
    let status = ['accepted', 'rejected'];

    const { applicants } = useSelector(store => store.application)



    return (
        <div>
            <div className="container overflow-x-scroll mx-auto my-2">
                <table className="min-w-full  bg-white border-collapse">

                    <thead>
                        <tr className="border-b-2 border-gray-300">
                            <th className="px-0 py-4 text-left">Full Name</th>
                            <th className="px-0 py-4 text-left">Email</th>
                            <th className="px-0 py-4 text-left">Contact</th>
                            <th className="px-0 py-4 text-left">Resume</th>

                            <th className="px-6 py-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applicants && applicants?.map((item) => (
                                <tr key={item._id} className="border-b border-gray-300">
                                    <td className="px-0 py-4 text-left">{item?.applicant?.fullname}</td>
                                    <td className="px-0 py-4 text-left">{item?.applicant.email}</td>
                                    <td className="px-0 py-4 text-left">  {item?.applicant?.phoneNumber}</td>
                                    <td className="px-0 py-4 text-left">{
                                        item?.applicant?.profile?.resume ? (item?.applicant?.profile?.resumeOriginalName) : <span>NA</span>
                                    }</td>


                                    <td className="px-6 py-4 text-left"><BasicPopover3 ApplicantId={item._id} Status={status} /></td>


                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ApplicantTable
