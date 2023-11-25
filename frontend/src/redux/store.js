import { configureStore } from '@reduxjs/toolkit'
import userAuthReducer from './features/userAuthSliceReducer/userAuthSlice'
import userStatusReducer from './features/userAuthSliceReducer/userStatusSlice'

//const store = createStore(userAuthReducer)

/*
const store = configureStore({
    reducer: {
        store: userAuthReducer,
    }
})

export default store

*/

const store = configureStore({
    reducer: {
        AUTH_TOKEN: userAuthReducer,
        USER_STATUS: userStatusReducer
    }
})

export default store;