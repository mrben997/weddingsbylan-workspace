import RecruitmentPage from ".";
import { HocLayzy } from "@/admin-react-app/reduxes/hoc.lazy";
import { AppDispatch, RootState } from "@/admin-react-app/reduxes/types";
import { connect } from 'react-redux';
import { TRecruitmentReduxProps, TRecruitmentReduxState } from "./types";
import { fetchRecruitmentThunk } from "./redux.thunks";
import RecruitmentSlice from "./redux.slice";
import { RecruitmentService } from "./service";
export const HocComp = HocLayzy(RecruitmentPage)()

const mapStateToProps = (state: RootState): TRecruitmentReduxState => ({
    data: state.RecruitmentSlice.data.entities,
    status: state.RecruitmentSlice.status
})

const mapDispatchToProps = (dispatch: AppDispatch): TRecruitmentReduxProps => {
    return {
        FetchData(...param) {
            return dispatch(fetchRecruitmentThunk())
        },
        async Create(model) {
            const data = await RecruitmentService.Create(model)
            if (data.Locale === 'vn') {
                dispatch(RecruitmentSlice.actions.Add(data))
            }
        },
        async Delete(Id, model) {
            const data = await RecruitmentService.Remove(Id)
            dispatch(RecruitmentSlice.actions.Remove(Id))
        },
        async Update(Id, model) {
            const data = await RecruitmentService.Update(Id, model)
            if (model.Locale === 'vn') {
                dispatch(RecruitmentSlice.actions.Update({
                    id: Id,
                    changes: model ?? {}
                }))
            }
        },
        async UpdateFull(where, model) {
            await RecruitmentService.UpdateWhere(where, model)
            if (model.Locale === 'vn' && model.Id) {
                dispatch(RecruitmentSlice.actions.Update({
                    id: model.Id,
                    changes: model ?? {}
                }))
            }
        },
    }
}

export const ReduxRecruitment = connect(mapStateToProps, mapDispatchToProps)(HocComp)
