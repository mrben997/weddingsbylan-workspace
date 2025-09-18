import { INews } from "@/admin-react-app/model";
import { CRUDActionReduxType, IReduxDispatch, IReduxState } from "@/admin-react-app/reduxes/types";
import { EntityId } from "@reduxjs/toolkit";

export type TNewsReduxState = {} & IReduxState<string, INews>
export type TNewsReduxProps = {
    UpdateFull: (where: any, model: Partial<INews>) => Promise<void>

} & IReduxDispatch & CRUDActionReduxType<INews, 'Id'>

interface INewsProps { }
export type TNewsProps = TNewsReduxState & TNewsReduxProps & INewsProps