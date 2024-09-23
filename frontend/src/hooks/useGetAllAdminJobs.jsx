import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jobSliceActions } from "../redux/jobSlice";
import { GET_JOB } from "../../../backend/utils/constant";

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await fetch(`https://jobportel.onrender.com/getadmin`, {
                    credentials: 'include'
                })
                let data = await res.json()

                if (data.success) {

                    dispatch(jobSliceActions.setAllAdminJobs(data.jobs))
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchAllAdminJobs()
    }, [])
}

export default useGetAllAdminJobs