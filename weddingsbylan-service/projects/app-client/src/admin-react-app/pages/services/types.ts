import { IService } from '@/admin-react-app/model'
import { CRUDActionReduxType, IReduxDispatch, IReduxState } from '@/admin-react-app/reduxes/types'

export enum EServiceSettingArea {
  photography = 'photography',
  makeupAndHair = 'makeupAndHair'
}

export enum EServiceType {
  package = 'package',
  note = 'note'
}
export interface IServiceSetting {
  /**
   * Version initialized at 29 September 2025
   */
  version: string
  data: {
    area?: EServiceSettingArea
    type?: EServiceType
  }
}

export interface IServiceDTO extends IService {
  Area?: string
  Type?: 'package' | 'note'
}

export type TServiceReduxState = {} & IReduxState<string, IService>
export interface TServiceReduxProps extends IReduxDispatch, CRUDActionReduxType<IService, 'Id'> {
  UpdateFull: (where: any, model: Partial<IService>) => Promise<void>
}

interface IServiceProps {}
export type TServiceProps = TServiceReduxState & TServiceReduxProps & IServiceProps
