import { createSlice } from "@reduxjs/toolkit"

const userStatusSlice = createSlice({
    name: "USER_STATUS",
    initialState: {
        status: false
    },
    reducers: {
        getStatus: (state) => {
            return state.status;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
            //return state.status;
        }
    }
})

export const { getStatus, setStatus } = userStatusSlice.actions
export const userAuthenticated = (state) => state.USER_STATUS.status;
export default userStatusSlice.reducer