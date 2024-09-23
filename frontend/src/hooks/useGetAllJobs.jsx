import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jobSliceActions } from "../redux/jobSlice";
import { GET_JOB } from "../../../backend/utils/constant";

const useGetAllJobs = () => {
    const dispatch = useDispatch()

    const { searchedQuery } = useSelector(store => store.job)



    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await fetch(`https://jobportel.onrender.com/get?keyword=${searchedQuery}`, {
                    credentials: 'include'
                })
                let data = await res.json()

                if (data.success) {

                    dispatch(jobSliceActions.setAllJobs(data.jobs))
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchAllJobs()
    }, [])
}

export default useGetAllJobs