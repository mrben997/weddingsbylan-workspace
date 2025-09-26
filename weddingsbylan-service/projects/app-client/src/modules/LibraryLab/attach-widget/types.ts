export type IAttachItemStatus = 'old' | 'new' | 'deleted'

export interface IAttachItem<O = any> {
  id: string
  name: string
  url?: string
  thumbnail?: string
  type: 'pdf' | 'image' | 'video' | 'unknown'
  status?: IAttachItemStatus
  file?: File
  options?: O
}

export interface IAttachItemConfig {
  color: string
  label: string
  count: number
}

export type IAttachItemConfigs = Record<IAttachItemStatus, IAttachItemConfig>

interface IAttachChangeOptions {
  isSave?: boolean
  signal?: AbortSignal
}

export type AttachChangeFunction = (items: IAttachItem[], options?: IAttachChangeOptions) => Promise<void>

interface IAttachUploadOptions {
  signal?: AbortSignal
}
