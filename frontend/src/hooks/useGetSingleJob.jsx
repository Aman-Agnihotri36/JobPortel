import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jobSliceActions } from "../redux/jobSlice";
import { GET_JOB } from "../../../backend/utils/constant";

const useGetSingleJob = (jobId) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await fetch(`https://jobportel.onrender.com/get/${jobId}`, {
                    credentials: 'include'
                })
                let data = await res.json()

                if (data.success) {

                    dispatch(jobSliceActions.setSingleJob(data.job))
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchSingleJob()
    }, [])
}

export default useGetSingleJob