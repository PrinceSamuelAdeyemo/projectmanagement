import { createSlice } from "@reduxjs/toolkit"

export const userStatusSlice = createSlice({
    name: "USER_STATUS",
    initialState: false,
    reducers: {
        getStatus: (state) => {
            return state;
        },
        setStatus: (state) => {
            state = true;
            return state;
        }
    }
})

export const { getStatus, setStatus } = userStatusSlice.actions
export default userStatusSlice.reducer