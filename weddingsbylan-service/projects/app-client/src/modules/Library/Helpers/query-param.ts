import queryString from 'query-string'

const StringStardize = (str: string) => str?.trim().toLowerCase() ?? ''

class QueryParamBase {
  private _GetValues() {
    return queryString.parse(decodeURIComponent(window.location.search))
  }

  private _GetValuesMap() {
    const query = this._GetValues()
    return new Map(Object.keys(query).map((x) => [StringStardize(x), query[x] as string]))
  }

  private _GetkeysMap() {
    const query = this._GetValues()
    return new Map(Object.keys(query).map((x) => [StringStardize(x), x]))
  }

  private getPath = () => (window.location.pathname === '/' ? '' : window.location.pathname)

  stringify<TParam extends Record<string, any> = any>(param: TParam) {
    return `?${encodeURIComponent(queryString.stringify(param))}`
  }

  Patch<TParam extends { [key: string]: any } = any, TState = any>(param: TParam, state?: TState) {
    const query = this._GetValues()
    const keyMap = this._GetkeysMap()
    Object.keys(param).forEach((k) => {
      const key = StringStardize(k)
      if (keyMap.has(key)) {
        query[keyMap.get(key) ?? ''] = param[k]
      } else {
        query[k] = param[k]
      }
    })
    this.Put(query, state)
  }

  Put<TParam extends Record<string, any> = any, TState = any>(param: TParam, state?: TState) {
    window.history.replaceState(state ?? {}, '', `${this.getPath()}${this.stringify(param)}`)
  }

  Deletes<TValue extends Record<string, any> = any>(...keys: (keyof TValue)[]) {
    this.DeletesWithState(keys)
  }

  DeletesWithState<TValue extends Record<string, any> = any, TState = any>(keys: (keyof TValue)[], state?: TState) {
    const query = this._GetValues()
    const keyMap = this._GetkeysMap()
    keys.forEach((k) => {
      const key = StringStardize(k.toString())
      if (keyMap.has(key)) {
        delete query[keyMap.get(key) ?? '']
      }
    })
    this.Put(query, state)
  }

  DeleteAll() {
    window.history.replaceState({}, '', `${this.getPath()}`)
  }

  GetAll = () => {
    return this._GetValues()
  }
  TryParseJson = <T>(value: string) => {
    try {
      return JSON.parse(value) as T
    } catch (error) {
      return undefined
    }
  }
  Gets<TValue extends Record<string, any> = any>(...keys: (keyof TValue)[]) {
    const query = this._GetValuesMap()
    return keys.reduce<Partial<TValue>>((a, k) => {
      const key = StringStardize(k.toString())
      if (query.has(key)) {
        a[k] = query.get(key) as any
      }
      return a
    }, {})
  }
}
export const QueryParam = new QueryParamBase()
// ; (window as any).QueryParam = QueryParam
export default QueryParam
