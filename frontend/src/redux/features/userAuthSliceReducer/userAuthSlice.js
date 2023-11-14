//import { userToken } from '../user_auth/userAuthActionType'
import { createSlice } from '@reduxjs/toolkit'

/*
const initialState = {
    token: []
}
*/

/*
const userAuthReducer = (state = initialState, action) =>{
    switch (action.type){
        case userToken:
            return {
                ...state,
                token: state.token.push(5)
            }

        default:
            return state
    }
}

export default userAuthReducer
*/

export const userAuthSlice = createSlice({
    name: 'token',
    initialState: {
        token: []
    },
    reducers: {
        getToken: (state) => {
            return state.token
        },
        addByToken: (state, action) => {
            state.token.push(action.payload)
        },
        removeByToken: (state, action) => {
            state.token.pop(action.payload)
        }
    }
})

export const { getToken, addByToken, removeByToken } = userAuthSlice.actions
export default userAuthSlice.reducer