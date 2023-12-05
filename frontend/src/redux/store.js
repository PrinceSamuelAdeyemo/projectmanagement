import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userAuthReducer from './features/userAuthSliceReducer/userAuthSlice'
import userStatusReducer from './features/userAuthSliceReducer/userStatusSlice'

// For redux persist
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';

const userStatusConfig = {
    key: "user_status",
    storage: sessionStorage
}

const persistConfig = {
    key: "root",
    storage,
    //stateReconciler: autoMergeLevel1
}

const rootReducer = combineReducers({
    AUTH_TOKEN: userAuthReducer,
    USER_STATUS: userStatusReducer
    //USER_STATUS: persistReducer(userStatusConfig, userStatusReducer)
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})



export const persistor = persistStore(store);