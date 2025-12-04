import events from 'events'

export enum EFileUploadType {
  Audio = 'Audio',
  Video = 'Video'
}

export interface IFileTypeParams {
  fileType: EFileUploadType
}

export interface IMetadata {
  mimeType: string
  name: string
  parents?: string[]
  length?: number
}

export interface ResumableUploadProps {
  file: File
  parents: string[]
  fields: string[]
  MultipleChunkSize?: number
  accessToken?: string
  query?: { [key: string]: any }
  urlInitialSession: string
}

export interface IDoUploadResponse<TData = any> {
  status: UploadStatus
  data?: TData
}

// const _UrlGetLink = "https://localhost:7145/api/v1/guest/Upload/ForwardUpload";
const minimumChunkSize = 1024 * 256
const defaultChunkSize = 50 * minimumChunkSize

export enum EventChannel {
  OnEnd = 'OnEnd',
  OnNext = 'OnNext',
  OnError = 'OnError',
  OnStart = 'OnStart'
}

export enum UploadStatus {
  Start = 'Start',
  Next = 'Next',
  Done = 'Done',
  Error = 'Error'
}

export interface ResumableUploadEvent {
  OnStart: string
  OnEnd: any
  OnNext: IProgressUpload
  OnError: string
}

export interface IProgressUpload {
  byteSent: number
  total: number
}

export class ResumableUploadService {
  private _file: File
  private _parents: string[]
  private _fields: string[]
  private _ChunkSize: number
  private _accessToken?: string
  private _eventEmitter: events.EventEmitter
  private _query: { [key: string]: any }
  private _UrlGetLink: string
  constructor(props: ResumableUploadProps) {
    this._file = props.file
    this._parents = props.parents
    this._fields = props.fields
    this._ChunkSize = props.MultipleChunkSize ? props.MultipleChunkSize * minimumChunkSize : defaultChunkSize
    this._accessToken = props.accessToken
    this._eventEmitter = new events.EventEmitter()
    this._query = props.query ?? {}
    this._UrlGetLink = props.urlInitialSession
  }
  addListener<KeyEvent extends keyof ResumableUploadEvent>(
    event: KeyEvent,
    callback: (status: UploadStatus, data: Extract<ResumableUploadEvent, object>[KeyEvent]) => void
  ) {
    this._eventEmitter.addListener(event, callback)
    return {
      remove: () => this._eventEmitter.removeListener(event, callback)
    }
  }

  private createFields = () => {
    return this._fields.length ? `fields=${encodeURIComponent(this._fields.join(','))}` : ''
  }

  private createQuery = () => {
    const strQuery = Object.keys(this._query).map((key) => `${key}=${this._query[key]}`)
    return strQuery.length ? strQuery.join('&') : ''
  }

  private createParams = () => {
    const params = [this.createFields(), this.createQuery()].filter((x) => x)
    return params.length ? `?${params.join('&')}` : ''
  }

  private createUrlInitSession() {
    if (!this._fields.length) {
      return this._UrlGetLink
    } else {
      return `${this._UrlGetLink}${this.createParams()}`
    }
  }

  private getHeader = (): HeadersInit => {
    const headers: HeadersInit = {}
    headers['Content-Type'] = 'application/json'
    if (this._accessToken) {
      headers['Authorization'] = 'Bearer ' + this._accessToken
    }
    return headers
  }

  private initialSession = async (params?: IFileTypeParams) => {
    const Url = this.createUrlInitSession()
    const body: IMetadata = {
      mimeType: this._file.type,
      name: this._file.name,
      parents: this._parents,
      length: this._file.size
    }

    const res = await fetch(Url, {
      method: 'POST',
      body: JSON.stringify(Object.assign({}, body, params ?? {})),
      headers: this.getHeader()
    })
    if (res.status === 200) {
      return res.headers.get('location') || res.headers.get('Location') || ''
    }
    throw new Error('init session fail!')
  }

  private getChunkFromFile = (data: Blob) => {
    return new Promise<Uint8Array>((resolve, reject) => {
      const fr = new FileReader()
      fr.onload = async () => {
        const buf = fr.result as ArrayBuffer
        resolve(new Uint8Array(buf))
      }
      fr.readAsArrayBuffer(data)
    })
  }

  private doUpload = async (url: string, data: Uint8Array, range: string, signal?: AbortSignal): Promise<IDoUploadResponse> => {
    const res = await fetch(url, { method: 'PUT', body: data as BodyInit, headers: { 'Content-Range': range }, signal })
    if (res.status === 308) {
      return { status: UploadStatus.Next }
    } else if (res.status === 200 || res.status === 201) {
      const data = await res.json()
      return { status: UploadStatus.Done, data }
    } else {
      const data = await res.text()
      return { status: UploadStatus.Error, data }
    }
  }

  private getRange = (start: number, end: number, fileSize: number) => {
    return 'bytes ' + start + '-' + end + '/' + fileSize
  }

  private executeBase = async (location: string, startByte: number = 0, signal?: AbortSignal) => {
    try {
      const fileSize = this._file.size
      this._eventEmitter.emit(EventChannel.OnStart, UploadStatus.Start, location)
      let start = startByte
      let data = undefined
      while (start < fileSize) {
        const temp = start + this._ChunkSize
        const end = fileSize < temp ? fileSize : temp

        const bodyData = await this.getChunkFromFile(this._file.slice(start, end))

        const res = await this.doUpload(location, bodyData, this.getRange(start, end - 1, fileSize), signal)

        start += this._ChunkSize

        switch (res.status) {
          case UploadStatus.Done:
            this._eventEmitter.emit(EventChannel.OnEnd, UploadStatus.Done, res.data)
            data = res.data
            break
          case UploadStatus.Next:
            this._eventEmitter.emit(EventChannel.OnNext, UploadStatus.Next, {
              byteSent: start,
              total: fileSize
            } as IProgressUpload)
            break
          default:
            throw new Error('DoUpload fail!')
        }
      }
      return data
    } catch (err) {
      this._eventEmitter.emit(EventChannel.OnError, UploadStatus.Error)
      throw err
    }
  }

  // getServerByteReceived = async (url: string, fileSize: number = 0) => {
  //   const res = await fetch(url, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Range': `bytes */${fileSize ? fileSize : '*'}`
  //     }
  //   })
  //   if (res.status === 308) {
  //     const range = res.headers.get('range')
  //     if (!range) {
  //       return 0
  //     }
  //     const temp = range.split('-')[1] || '0'
  //     const byteSent = parseInt(temp)
  //     return byteSent
  //   } else if (res.status === 200 || res.status === 201) {
  //     return -1
  //   } else {
  //     throw new Error('Not Found!')
  //   }
  // }

  // interruptedUpload = async (url: string, signal?: AbortSignal) => {
  //   let byteStart = 0
  //   try {
  //     const res = await this.getServerByteReceived(url, this._file.size)
  //     if (res < 0) {
  //       this._eventEmitter.emit('OnEnd', UploadStatus.Done)
  //       return res
  //     } else {
  //       byteStart = res
  //     }
  //   } catch {
  //     url = await this.initialSession()
  //   }
  //   await this.executeBase(url, byteStart + 1, signal)
  // }

  newUpload = async (params?: IFileTypeParams, signal?: AbortSignal) => {
    const url = await this.initialSession(params)
    return await this.executeBase(url, 0, signal)
  }
}

interface IUploadRequestParams {
  file: File
  fileType: EFileUploadType
  apiUrl: string
  progress: (value: number) => void
  accessToken?: string
}

export interface IUploadResult {
  id: string
  name: string
  createdTime: string
  fileExtension: string
  size: string
}

type UploadRequestFunction = (params: IUploadRequestParams, options?: { signal?: AbortSignal }) => Promise<IUploadResult | undefined>

class UploadService {
  uploadRequest: UploadRequestFunction = async (params, options) => {
    const { file, fileType, apiUrl, accessToken, progress } = params
    const query = { supportsAllDrives: true }
    const uploadService = new ResumableUploadService({ file, accessToken, fields: ['id'], urlInitialSession: apiUrl, query, parents: [] })

    uploadService.addListener(EventChannel.OnNext, (status, pro) => {
      progress((pro.byteSent * 100) / pro.total)
    })

    // uploadService.addListener(EventChannel.OnEnd, (status, pro) => {
    //   console.log(100, pro)
    // })

    try {
      const res = await uploadService.newUpload({ fileType: fileType }, options?.signal)
      return res ? (res as IUploadResult) : undefined
    } catch (error) {
      const err = error as Error
      try {
        const messageData = JSON.parse(err.message)
        const temp = Object.values(messageData)[0]
        console.log(temp)
      } catch {
        throw err
      }
      throw err
    }
  }
}
export const uploadService = new UploadService()
