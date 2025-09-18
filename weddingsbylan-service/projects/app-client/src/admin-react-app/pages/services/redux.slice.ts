import { IService } from "@/admin-react-app/model";
import CreateCRUDSlice from "@/admin-react-app/reduxes/crud.create.slice";
import { EFetchStatus, ISliceBase } from "@/admin-react-app/reduxes/types";
import { fetchServiceThunk } from "./redux.thunks";

interface IServiceSclice extends ISliceBase<IService, number> { }
const ServiceSlice = CreateCRUDSlice<IService>()({
    name: 'ServiceSlice',
    selectId: (x) => x.Id,
    Initial: (x) => {
        return { ...x } as IServiceSclice
    },
    extraReducers: (builder, adapter) => {
        builder
            .addCase(fetchServiceThunk.fulfilled, (state, action) => {
                if (state.requestedId !== action.meta.requestId) return
                state.status = EFetchStatus.Loaded
                adapter.upsertMany(state.data, action.payload)
            })
            .addCase(fetchServiceThunk.rejected, (state, action) => {
                if (state.requestedId !== action.meta.requestId) return
                state.status = EFetchStatus.Error
            })
            .addCase(fetchServiceThunk.pending, (state, action) => {
                state.requestedId = action.meta.requestId
                state.status = EFetchStatus.Loading
            })
    },
    reducers: {
    }
})
export default ServiceSlice