import NewsPage from ".";
import { HocLayzy } from "@/admin-react-app/reduxes/hoc.lazy";
import { AppDispatch, RootState } from "@/admin-react-app/reduxes/types";
import { connect } from 'react-redux';
import { TNewsReduxProps, TNewsReduxState } from "./types";
import { fetchNewsThunk } from "./redux.thunks";
import newsSlice from "./redux.slice";
import { Sleep } from "@/modules/Library/Helpers";
import { newSService } from "./service";
export const HocComp = HocLayzy(NewsPage)()

const mapStateToProps = (state: RootState): TNewsReduxState => ({
    data: state.newsSlice.data.entities,
    status: state.newsSlice.status
})

const mapDispatchToProps = (dispatch: AppDispatch): TNewsReduxProps => {
    return {
        FetchData(...param) {
            return dispatch(fetchNewsThunk())
        },
        async Create(model) {
            const data = await newSService.Create(model)
            if (data.Locale === 'vn') {
                dispatch(newsSlice.actions.Add(data))
            }
        },
        async Delete(Id, model) {
            const data = await newSService.Remove(Id)
            dispatch(newsSlice.actions.Remove(Id))
        },
        async Update(Id, model) {
            const data = await newSService.UpdatePartial(Id, model)
            if (model.Locale === 'vn') {
                dispatch(newsSlice.actions.Update({
                    id: Id,
                    changes: model ?? {}
                }))
            }
        },
        async UpdateFull(where, model) {
            await newSService.UpdateWhere(where, model)
            if (model.Locale === 'vn' && model.Id) {
                dispatch(newsSlice.actions.Update({
                    id: model.Id,
                    changes: model ?? {}
                }))
            }
        },
    }
}

export const ReduxNews = connect(mapStateToProps, mapDispatchToProps)(HocComp)
