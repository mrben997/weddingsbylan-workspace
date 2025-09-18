import { INews } from "@/admin-react-app/model";
import CreateCRUDSlice from "@/admin-react-app/reduxes/crud.create.slice";
import { EFetchStatus, ISliceBase } from "@/admin-react-app/reduxes/types";
import { fetchNewsThunk } from "./redux.thunks";

interface INewsSclice extends ISliceBase<INews, number> { }
const newsSlice = CreateCRUDSlice<INews>()({
    name: 'newsSlice',
    selectId: (x) => x.Id,
    Initial: (x) => {
        return { ...x } as INewsSclice
    },
    extraReducers: (builder, adapter) => {
        builder
            .addCase(fetchNewsThunk.fulfilled, (state, action) => {
                if (state.requestedId !== action.meta.requestId) return
                state.status = EFetchStatus.Loaded
                adapter.upsertMany(state.data, action.payload)
            })
            .addCase(fetchNewsThunk.rejected, (state, action) => {
                if (state.requestedId !== action.meta.requestId) return
                state.status = EFetchStatus.Error
            })
            .addCase(fetchNewsThunk.pending, (state, action) => {
                state.requestedId = action.meta.requestId
                state.status = EFetchStatus.Loading
            })
    },
    reducers: {
    }
})
export default newsSlice