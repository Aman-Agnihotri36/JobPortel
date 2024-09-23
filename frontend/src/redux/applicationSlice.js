import { createSlice } from "@reduxjs/toolkit";

const applicantSlice = createSlice({
    name: 'application',
    initialState: {
        applicants: []

    },

    reducers: {
        setApplicants: (state, action) => {
            state.applicants = action.payload
        }

    }
})

export const applicantSliceAction = applicantSlice.actions
export default applicantSlice