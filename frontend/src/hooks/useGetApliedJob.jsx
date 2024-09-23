import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { jobSliceActions } from "../redux/jobSlice"
import { APPLI } from "../../../backend/utils/constant"


const useGetAppliedJobs = () => {
    const dispath = useDispatch()

    useEffect(() => {
        const GetAllJobs = async () => {
            try {
                const res = await fetch(`https://jobportel.onrender.com/api/v1/application/get`, {

                    credentials: 'include',

                })

                const data = await res.json()
                if (data.success) {
                    dispath(jobSliceActions.setAppliedJobsByStudent(data.application))
                }
            } catch (error) {
                console.log(error)
            }
        }
        GetAllJobs()
    }, [])
}

export default useGetAppliedJobs