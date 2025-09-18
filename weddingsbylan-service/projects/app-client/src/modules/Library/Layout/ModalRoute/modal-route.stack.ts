import { QueryParam } from '../../Helpers'
import { MRAccessory } from './CreatetModalRoute'
import { GetMRParam, ILayoutQueryParam } from './helper'

class StackBase {
  [key: string]: any
  PopMdStack = (key?: string, data?: any) => {
    const qur = GetMRParam()
    if (key) {
      const index = qur.findIndex((x) => x === key)
      qur.splice(index, 1)
    } else {
      qur.pop()
    }
    QueryParam.Patch<ILayoutQueryParam>({ md: qur }, data)
    MRAccessory.handler?.refresh()
  }
  PushMdStack = (key: string, data?: any) => {
    const qur = GetMRParam()
    qur.push(key)
    QueryParam.Patch<ILayoutQueryParam>({ md: qur }, data)
    MRAccessory.handler?.refresh()
  }
  GoBack = () => {
    window.history.back()
  }
  GoForward = () => {
    window.history.forward()
  }
}
const MRStack = new StackBase()
// ;(window as any).MRStack = MRStack
export default MRStack
