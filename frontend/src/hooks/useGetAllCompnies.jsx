import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { companySliceActions } from "../redux/companySlice";
import { GET_COMPANY } from "../../../backend/utils/constant";

const useGetAllCompany = () => {
    const dispatch = useDispatch()

    useEffect(() => {

    })

    useEffect(() => {
        const fetchAllCompany = async () => {
            try {

                const res = await fetch(`https://jobportel.onrender.com/api/v1/company/get`, {
                    credentials: 'include'
                })
                let data = await res.json()
                console.log(data)
                if (data.success) {

                    dispatch(companySliceActions.setCompanies(data.companies))
                }
            } catch (error) {
                console.log("YOUR ERROR", error)
            }
        }

        fetchAllCompany()
    }, [])
}

export default useGetAllCompany