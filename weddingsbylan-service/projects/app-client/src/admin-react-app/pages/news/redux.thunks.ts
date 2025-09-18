import { INews } from "@/admin-react-app/model"
import { RootState } from "@/admin-react-app/reduxes/types"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { newSService } from "./service"

interface IParamThunk { }
// interface IResponse { }
export const fetchNewsThunk = createAsyncThunk<INews[], IParamThunk | undefined>('fetchNewsThunk', async (param, thunkAPI) => {
    const data = await newSService.Filter({ where: { Locale: "vn" } }, thunkAPI.signal)
    return data ?? []
})