import { IService } from "@/admin-react-app/model"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { serviceService } from "./service"

interface IParamThunk { }
// interface IResponse { }
export const fetchServiceThunk = createAsyncThunk<IService[], IParamThunk | undefined>('fetchServiceThunk', async (param, thunkAPI) => {
    const data = await serviceService.Filter({ where: { Locale: "vn" } }, thunkAPI.signal)
    return data ?? []
})