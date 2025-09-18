import { configureStore } from "@reduxjs/toolkit";
import Reducers from './reducer'
export const store = configureStore({
    reducer: Reducers,
})

export default store