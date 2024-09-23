import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        allJobs: [],
        // jab single cheej rakhni hoti hai to null rakhte hai hame multiple jobs chaiye to hamne array rakha hai
        singleJob: null,
        allAdminJobs: [],
        searchAdminJobsByText: "",
        appliedJobsByStudent: [],
        searchedQuery: "",
        saveJobs: []
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload
        },
        setsearchAdminJobsByText: (state, action) => {
            state.searchAdminJobsByText = action.payload
        },
        setAppliedJobsByStudent: (state, action) => {
            state.appliedJobsByStudent = action.payload
        },
        setSearchQuery: (state, action) => {
            state.searchedQuery = action.payload
        },
        setSaveJobs: (state, action) => {

            state.saveJobs.push(action.payload)
        },
        removeSaveJob: (state, action) => {

            console.log("YOUR PAYLOAD", action.payload)
            state.saveJobs = state.saveJobs.filter((job) => job._id != action.payload);

        }
    }
})

export const jobSliceActions = jobSlice.actions
export default jobSlice