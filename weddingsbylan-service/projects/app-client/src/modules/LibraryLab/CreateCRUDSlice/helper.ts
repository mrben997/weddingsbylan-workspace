type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] } | undefined
class HelperBase {
  isObject = (obj: any) => {
    return obj && typeof obj === 'object' && !Array.isArray(obj)
  }

  mergeObjects = <T>(...objects: DeepPartial<T>[]): T => {
    return objects.reduce((prev, obj) => {
      if (!obj) return prev
      Object.keys(obj).forEach((key) => {
        if (this.isObject((prev as any)[key]) && this.isObject((obj as any)[key])) {
          ;(prev as any)[key] = this.mergeObjects((prev as any)[key], (obj as any)[key])
        } else {
          ;(prev as any)[key] = (obj as any)[key]
        }
      })
      return prev
    }, {} as T) as any
  }
}
const SliceBaseHelper = new HelperBase()
export default SliceBaseHelper
