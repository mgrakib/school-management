import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './fetures/counter/futures'
export const store = configureStore({
    reducer: {
        counter: counterReducer
    },
})