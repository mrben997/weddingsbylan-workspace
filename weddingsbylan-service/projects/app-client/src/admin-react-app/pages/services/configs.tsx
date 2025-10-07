import { IService } from '@/admin-react-app/model'
import { EServiceSettingArea, EServiceType, IServiceDTO, IServiceSetting } from './types'
import { tryParseArray } from '@/modules/LibraryLab/attach-widget/helpers'
import { tryParseObject } from '@/modules/Library/Helpers'

export const getServiceTypeOptions = () => Array.from(Object.values(EServiceType)).map((x) => ({ name: x.toString(), value: x }))

export const getServiceSettingAreaOptions = () => Array.from(Object.values(EServiceSettingArea)).map((x) => ({ name: x.toString(), value: x }))

export const mapService = (item: IService): IServiceDTO => {
  const obj: IServiceDTO = { ...item }
  const setting = tryParseObject<IServiceSetting>(item.Content, { version: '0.0.1', data: {} })
  obj.Area = setting.data.area
  obj.Type = setting.data.type
  return obj
}

export const mapServices = (items: IService[]): IServiceDTO[] => {
  return items.map<IServiceDTO>(mapService)
}
