import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { companySliceActions } from "../redux/companySlice";
import { GET_COMPANY } from "../../../backend/utils/constant";

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await fetch(`${GET_COMPANY}/get/${companyId}`, {
                    credentials: 'include'
                })
                let data = await res.json()

                if (data.success) {

                    dispatch(companySliceActions.setSingleCompany(data.company))
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchSingleCompany()
    }, [companyId, dispatch])
}

export default useGetCompanyById