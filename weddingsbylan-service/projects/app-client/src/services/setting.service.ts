import { ESettingArea, ESettingAreaBase, ISetting } from '@/admin-react-app/model'
import { ISettingStruct, TInnerType } from '@/admin-react-app/pages/settings/types'
import { CRUDService } from './crud.service'
import { TLanguage } from '@/locales/types'

const buildWhere = (key: string, logic: 'or' | 'and', value: any | any[]) => {
  if (!value) {
    return {}
  }
  if (Array.isArray(value) && value.length < 2) {
    value = value[0]
  }
  let result = {}
  if (!Array.isArray(value)) {
    result = { [key]: value }
  } else {
    result = { [logic]: value.map((x) => ({ [key]: x })) }
  }
  return result
}

export class SettingSService extends CRUDService<ISetting, number> {
  getSettingdata = async (
    Locale: TLanguage | string,
    area: ESettingAreaBase | ESettingAreaBase[],
    type: keyof ISettingStruct | (keyof ISettingStruct)[],
    signal?: AbortSignal
  ) => {
    let Area = buildWhere('Area', 'or', area)
    let Type = buildWhere('Type', 'or', type)

    const data = await this.Filter(
      {
        where: {
          ...Area,
          ...Type,
          Locale
        }
      },
      signal
    )

    return data ? new SettingStore(data) : null
  }
  getSettingDataSingle = async (Locale: TLanguage | string, Area: ESettingAreaBase, FromKey: keyof ISettingStruct, signal?: AbortSignal) => {
    const data = await this.Filter(
      {
        where: {
          Area,
          Locale,
          FromKey
        }
      },
      signal
    )

    return data ? new SettingStore(data) : null
  }
}
export class SettingStore {
  _data: ISetting[]
  constructor(d: ISetting[]) {
    this._data = d
  }
  getData = <Tkey extends keyof ISettingStruct, T>(key: Tkey): TInnerType<ISettingStruct[Tkey]>[] => {
    // console.log(this._data?.map(x => ({ Id: x.Id, Type: x.Type })), key);
    return this._data.filter((x) => x.Type === key && x.Content).map((x) => JSON.parse(x.Content as any))[0]
    // try {
    //     return this._data.filter(x => x.Type === key && x.Content).map(x => JSON.parse(x.Content as any))[0]
    // } catch (error) {
    //     console.log("error", key, this._data);
    //     return {} as any
    // }
  }
  getSingleData = <Tkey extends keyof ISettingStruct, T>(key: Tkey): TInnerType<ISettingStruct[Tkey]> | undefined => {
    const data = this._data.filter((x) => x.Type === key && x.Content).map((x) => JSON.parse(x.Content as any))[0]
    return data ? (data[0] as TInnerType<ISettingStruct[Tkey]>) : undefined
  }
}

export const settingSService = new SettingSService('settings')
