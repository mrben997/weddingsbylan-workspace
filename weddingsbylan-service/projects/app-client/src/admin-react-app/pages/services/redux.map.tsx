import ServicePage from '.'
import { HocLayzy } from '@/admin-react-app/reduxes/hoc.lazy'
import { AppDispatch, RootState } from '@/admin-react-app/reduxes/types'
import { connect } from 'react-redux'
import { TServiceReduxProps, TServiceReduxState } from './types'
import { fetchServiceThunk } from './redux.thunks'
import ServiceSlice from './redux.slice'
import { Sleep } from '@/modules/Library/Helpers'
import { serviceService } from './service'
export const HocComp = HocLayzy(ServicePage)()

const mapStateToProps = (state: RootState): TServiceReduxState => ({
  data: state.serviceSlice.data.entities,
  status: state.serviceSlice.status
})

const mapDispatchToProps = (dispatch: AppDispatch): TServiceReduxProps => {
  return {
    FetchData(...param) {
      return dispatch(fetchServiceThunk())
    },
    async Create(model) {
      const data = await serviceService.Create(model)
      if (data.Locale === 'vn') {
        dispatch(ServiceSlice.actions.Add(data))
      }
    },
    async Delete(Id, model) {
      await serviceService.Remove(Id)
      dispatch(ServiceSlice.actions.Remove(Id))
    },
    async Update(Id, model) {
      await serviceService.Update(Id, model)
      if (model.Locale === 'vn') {
        dispatch(ServiceSlice.actions.Update({ id: Id, changes: model ?? {} }))
      }
    },
    async UpdateFull(where, model) {
      await serviceService.UpdateWhere(where, model)
      if (model.Locale === 'vn' && model.Id) {
        dispatch(ServiceSlice.actions.Update({ id: model.Id, changes: model ?? {} }))
      }
    }
  }
}

export const ReduxService = connect(mapStateToProps, mapDispatchToProps)(HocComp)
