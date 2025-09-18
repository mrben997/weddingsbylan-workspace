import { IService } from "@/admin-react-app/model";
import { CRUDActionReduxType, IReduxDispatch, IReduxState } from "@/admin-react-app/reduxes/types";

export type TServiceReduxState = {} & IReduxState<string, IService>
export type TServiceReduxProps = {
    UpdateFull: (where: any, model: Partial<IService>) => Promise<void>
} & IReduxDispatch & CRUDActionReduxType<IService, 'Id'>

interface IServiceProps { }
export type TServiceProps = TServiceReduxState & TServiceReduxProps & IServiceProps