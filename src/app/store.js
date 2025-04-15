import {configureStore} from '@reduxjs/toolkit'
import taskReducer from '../features/taskslice'
import authReducer from '../features/authslice'

export const store = configureStore({
    reducer: {
        task: taskReducer,
        auth: authReducer
    }
})