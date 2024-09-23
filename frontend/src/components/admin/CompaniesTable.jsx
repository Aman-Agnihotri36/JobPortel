import { Avatar } from 'antd';
import React, { useEffect, useState } from 'react'
import BasicPopover2 from '../shared/Popover2';

import { useSelector } from 'react-redux';

function CompaniesTable() {

    const { companies, searchCompanyByText } = useSelector(store => store.company)

    const [filterCompany, setFilterCompany] = useState(companies)

    useEffect(() => {
        const filteredCompany = companies?.length >= 0 && companies?.filter((company) => {
            if (!searchCompanyByText) {
                return true
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterCompany(filteredCompany)
    }, [companies, searchCompanyByText])

    return (
        <div className="container mx-auto my-2">
            <table className="min-w-full bg-white border-collapse">

                <thead>
                    <tr className="border-b-2 border-gray-300">
                        <th className="px-6 py-4 text-left">Logo</th>
                        <th className="px-6 py-4 text-left">Name</th>
                        <th className="px-6 py-4 text-left">Date</th>
                        <th className="px-6 py-4 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filterCompany.length <= 0 ? <span className='relative left-72 top-10' >You haven't registered any Company yet</span> : (
                        <>
                            {filterCompany.map((comp) => (
                                <tr key={comp._id} className="border-b border-gray-300">
                                    <td className="px-6 py-4 text-left"><Avatar alt="Remy Sharp" src={comp?.logo} /></td>
                                    <td className="px-6 py-4 text-left">{comp.name}</td>
                                    <td className="px-6 py-4 text-left">  {comp.createdAt.split("T")[0]}</td>
                                    <td className="px-6 py-4 text-left">
                                        <BasicPopover2 Company={comp._id} />
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

export default CompaniesTable
