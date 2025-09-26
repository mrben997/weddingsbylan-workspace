import EventEmitter from 'events'

export type EventUpload = 'Completed' | 'Error' | 'Start' | 'Next' | 'Finished'

interface IEventUpload<TModel = any> {
  Completed: TModel
  Error: TModel
  Start: TModel
  Next: TModel
  Finished: any
}

export class UploadMonitor<T extends { id: number | string; signal?: AbortController }> {
  constructor(numWorker: number, executor: (item: T, signal?: AbortSignal) => Promise<void>, getItem: () => T | undefined) {
    this._NumWorker = numWorker
    this._getItem = getItem
    this._executor = executor
    this.events = new EventEmitter()
  }
  events: EventEmitter
  _NumWorker: number
  _lock = new Lock()
  _count = 0
  _getItem: () => T | undefined
  _executor: (item: T, signal?: AbortSignal) => Promise<void>

  addEventListen = <key extends keyof IEventUpload<T>>(event: key, callback: (item: IEventUpload<T>[key], error?: Error) => void) => {
    return this.events.addListener(event, callback)
  }
  addEventListenFinished = <key extends EventUpload>(event: key, callback: (error?: Error) => void) => {
    return this.events.addListener(event, callback)
  }
  _emit = <key extends EventUpload>(event: key, ...item: any[]) => {
    this.events.emit(event, item)
  }
  getItem = (): Promise<T | undefined> => {
    return this._lock.Sync<T | undefined>(async () => {
      return this._getItem()
    })
  }
  clearAll = () => {
    this.events.removeAllListeners()
    this._poolTasks = []
  }
  _worker = async () => {
    this._count += 1
    try {
      let item = await this.getItem()
      while (item) {
        try {
          this._emit('Start', item)
          item.signal = new AbortController()
          await this._executor(item, item.signal.signal)
          this._emit('Completed', item)
        } catch (error) {
          this._emit('Error', item, error)
        }

        item = await this.getItem()

        if (item) {
          this._emit('Next', item)
        }
      }
    } finally {
      this._count -= 1
    }
  }

  _poolTasks: Promise<any>[] = []
  _allTask?: {
    resolve: (value: unknown) => void
    promise: Promise<any>
  }

  Wait = async () => {
    if (!this._allTask) {
      let resolve = Promise.resolve as (value: unknown) => void
      const promise = new Promise((res) => (resolve = res!))
      this._allTask = { promise, resolve }

      while (this._poolTasks.length) {
        await this._poolTasks.shift()
      }

      this._allTask.resolve(undefined)
      this._allTask = undefined
      this._emit('Finished')
    } else {
      return await this._allTask.promise
    }
  }

  start = async () => {
    for (let index = this._count; index < this._NumWorker; index++) {
      this._poolTasks.push(this._worker())
    }
    await this.Wait()
  }
}

export class Lock {
  private _listQueue: {
    res: (p?: any) => void
    rej: (p?: any) => void
    action: () => Promise<any>
  }[] = []
  private _lock = false
  Sync = <TResult>(action: () => Promise<TResult>): Promise<TResult> => {
    const response = new Promise<TResult>((res, rej) => {
      this._listQueue.push({ res, action, rej })
    })
    if (!this._lock) this._ProcessQueue()
    return response
  }
  _ProcessQueue = async () => {
    this._lock = true
    try {
      while (this._listQueue.length) {
        const item = this._listQueue.shift()
        if (!item) continue
        try {
          item.res(await item.action())
        } catch (e) {
          item.rej(e)
        }
      }
    } finally {
      this._lock = false
    }
  }

  Once = async <Tmodel>(action: () => Promise<Tmodel>): Promise<Tmodel> => {
    if (this._lock) {
      return await new Promise((res, rej) => {
        this._listQueue.push({ res, action, rej })
      })
    }
    this._lock = true
    try {
      var res = await action()
      this._listQueue.forEach((a) => a.res(res))
      return res
    } catch (e) {
      this._listQueue.forEach((a) => a.rej(e))
      throw e
    } finally {
      this._listQueue = []
      this._lock = false
    }
  }
}
