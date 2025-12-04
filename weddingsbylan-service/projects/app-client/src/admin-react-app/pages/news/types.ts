import { INews } from '@/admin-react-app/model'
import { CRUDActionReduxType, IReduxDispatch, IReduxState } from '@/admin-react-app/reduxes/types'
import { IAttachItem, ICellAttachWidgetParams } from '@/modules/LibraryLab/attach-widget'
import { EntityId } from '@reduxjs/toolkit'
export interface IUploadResult {
  filename: string
}

export type TNewsReduxState = IReduxState<string, INews>
export interface TNewsReduxProps extends IReduxDispatch, CRUDActionReduxType<INews, 'Id'> {
  UpdateFull: (where: any, model: Partial<INews>) => Promise<void>
  UpdatePatch: (id: number, model: Partial<INews>) => Promise<void>
  onAttachChange: ICellAttachWidgetParams['onChange']
  onUploadAttachFile: (file: File, signal?: AbortSignal) => Promise<IUploadResult>
  onDeleteAttachFile?: (fileName: string) => Promise<void>
}

interface INewsProps {}
export type TNewsProps = TNewsReduxState & TNewsReduxProps & INewsProps
