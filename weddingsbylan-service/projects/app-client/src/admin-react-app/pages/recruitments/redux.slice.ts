import { IRecruitment } from "@/admin-react-app/model";
import CreateCRUDSlice from "@/admin-react-app/reduxes/crud.create.slice";
import { EFetchStatus, ISliceBase } from "@/admin-react-app/reduxes/types";
import { fetchRecruitmentThunk } from "./redux.thunks";

interface IRecruitmentSclice extends ISliceBase<IRecruitment, number> { }
const RecruitmentSlice = CreateCRUDSlice<IRecruitment>()({
    name: 'RecruitmentSlice',
    selectId: (x) => x.Id,
    Initial: (x) => {
        return { ...x } as IRecruitmentSclice
    },
    extraReducers: (builder, adapter) => {
        builder
            .addCase(fetchRecruitmentThunk.fulfilled, (state, action) => {
                if (state.requestedId !== action.meta.requestId) return
                state.status = EFetchStatus.Loaded
                adapter.upsertMany(state.data, action.payload)
            })
            .addCase(fetchRecruitmentThunk.rejected, (state, action) => {
                if (state.requestedId !== action.meta.requestId) return
                state.status = EFetchStatus.Error
            })
            .addCase(fetchRecruitmentThunk.pending, (state, action) => {
                state.requestedId = action.meta.requestId
                state.status = EFetchStatus.Loading
            })
    },
    reducers: {
    }
})
export default RecruitmentSlice