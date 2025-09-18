import { IRecruitment } from "@/admin-react-app/model"
import { RootState } from "@/admin-react-app/reduxes/types"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { RecruitmentService } from "./service"

interface IParamThunk { }
// interface IResponse { }
export const fetchRecruitmentThunk = createAsyncThunk<IRecruitment[], IParamThunk | undefined>('fetchRecruitmentThunk', async (param, thunkAPI) => {
    const data = await RecruitmentService.Filter({ where: { Locale: "vn" } }, thunkAPI.signal)
    return data ?? []
})