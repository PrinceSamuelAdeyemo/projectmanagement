import { configureStore } from '@reduxjs/toolkit'
import userAuthReducer from './features/userAuthSliceReducer/userAuthSlice'

//const store = createStore(userAuthReducer)

/*
const store = configureStore({
    reducer: {
        store: userAuthReducer,
    }
})

export default store

*/

export default configureStore({
    reducer: {
        AUTH_TOKEN: userAuthReducer,
    }
})