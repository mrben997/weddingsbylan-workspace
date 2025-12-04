import { PropsWithChildren } from 'react'
import ProgressItem from './progress-item'

export type ProcessitemStatus = 'Pending' | 'Completed' | 'Error' | 'Processing'

export interface IProcessItem<TModel extends Object = any> {
  id: number | string
  file: File
  name: string
  status: ProcessitemStatus
  value?: number
  signalController?: AbortController
  handle?: ProgressItem | null
  message?: string
  other?: TModel
  uploadResult?: any // Store the result from uploadExecutor
}

export interface IBatchResult {
  completed: IProcessItem[]
  errors: IProcessItem[]
  total: number
  success: number
  failed: number
}

export type OnUploadExecutorFunction<R = any> = (item: IProcessItem, progress: (value: number) => void) => Promise<R>

export type OnBatchCompleteFunction = (results: IBatchResult) => void

export interface IUploadLayoutProps extends PropsWithChildren {
  onUploadExecutor: OnUploadExecutorFunction
  onItemComplete?: (item: IProcessItem) => void
  onBatchComplete?: OnBatchCompleteFunction
  horizontal?: 'end' | 'start'
  vertical?: 'end' | 'start'
  contentHeight?: number
  contentWidth?: number
  itemHeight?: number
  open?: boolean
}

export interface IUploadLayoutState {
  open?: boolean
  showComfirm: boolean
}

export interface IUploadLayoutContext {
  state: IUploadLayoutState
  getErrors: () => IProcessItem[]
  getComplete: () => IProcessItem[]
  onItemClose: (item: IProcessItem) => void
  onItemRetry: (item: IProcessItem) => void
  onRetryAll: () => void
  addItems: (items: Omit<IProcessItem, 'Value' | 'Signal' | 'handle'>[]) => void
  setError: (id: number, message: string) => void
  show: () => void
  close: () => void
  items: IProcessItem[]
}
