import { IRecruitment } from "@/admin-react-app/model";
import { CRUDActionReduxType, IReduxDispatch, IReduxState } from "@/admin-react-app/reduxes/types";
import { EntityId } from "@reduxjs/toolkit";

export type TRecruitmentReduxState = {} & IReduxState<string, IRecruitment>
export type TRecruitmentReduxProps = {
    UpdateFull: (where: any, model: Partial<IRecruitment>) => Promise<void>
} & IReduxDispatch & CRUDActionReduxType<IRecruitment, 'Id'>

interface IRecruitmentProps { }
export type TRecruitmentProps = TRecruitmentReduxState & TRecruitmentReduxProps & IRecruitmentProps