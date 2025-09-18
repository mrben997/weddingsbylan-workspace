import { combineReducers } from "@reduxjs/toolkit";
import RecruitmentSlice from "../pages/recruitments/redux.slice";
import newsSlice from "../pages/news/redux.slice";
import serviceSlice from "../pages/services/redux.slice";

export default combineReducers({
    RecruitmentSlice: RecruitmentSlice.reducer,
    newsSlice: newsSlice.reducer,
    serviceSlice: serviceSlice.reducer
})