import { HocLayzy } from '@/admin-react-app/reduxes/hoc.lazy'
import { AppDispatch, RootState } from '@/admin-react-app/reduxes/types'
import { connect } from 'react-redux'
import { TNewsReduxProps, TNewsReduxState } from './types'
import { fetchNewsThunk } from './redux.thunks'
import newsSlice from './redux.slice'
import { Sleep } from '@/modules/Library/Helpers'
import { newSService } from './service'
import { INews } from '@/admin-react-app/model'
import { serviceUpload } from '@/admin-react-app/services/service.upload'

export const mapStateToProps = (state: RootState): TNewsReduxState => ({
  data: state.newsSlice.data.entities,
  status: state.newsSlice.status
})

export const mapDispatchToProps = (dispatch: AppDispatch): TNewsReduxProps => {
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
        dispatch(
          newsSlice.actions.Update({
            id: Id,
            changes: model ?? {}
          })
        )
      }
    },
    async UpdateFull(where, model) {
      await newSService.UpdateWhere(where, model)
      if (model.Locale === 'vn' && model.Id) {
        dispatch(
          newsSlice.actions.Update({
            id: model.Id,
            changes: model ?? {}
          })
        )
      }
    },

    async UpdatePatch(id, model) {
      await newSService.UpdatePartial(id, model)
      if (model.Locale === 'vn') {
        dispatch(newsSlice.actions.Update({ id: id, changes: model ?? {} }))
      }
    },
    onAttachChange: async ({ row, items, options }) => {
      try {
        const id = (row as INews).Id
        const itemsFiltered = items.filter((x) => x.url && x.status !== 'deleted').map(({ file, ...x }) => x)
        const body: Partial<INews> = { Description: JSON.stringify(itemsFiltered) }
        await newSService.UpdatePartial(id, body, options?.signal)
        dispatch(fetchNewsThunk())
      } catch (error) {
        // ApiAlertContext.ApiAlert?.PushError('Failed to update attachments!')
        throw error
      }
    },
    onDeleteAttachFile: async (name) => {
      // await attachFileService.remove(name)
    },
    onUploadAttachFile: async (file, s) => {
      const res = await serviceUpload.uploadNewsImage(file, s)
      return { filename: res.filename }
    }
  }
}
