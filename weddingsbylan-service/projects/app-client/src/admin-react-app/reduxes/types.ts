import { store } from '@/admin-react-app/reduxes'
import { EntityId, EntityState } from '@reduxjs/toolkit'
export enum EFetchStatus {
    Loading = "Loading", Loaded = "Loaded", Error = "Error"
}

export interface IReduxState<Id extends EntityId, T = any> {
    status: EFetchStatus
    data: Record<Id, T>
}
export interface IReduxDispatch {
    FetchData?: (...param: any[]) => { abort: () => void }
}

export interface IHocComponentProps extends IReduxState<EntityId>, IReduxDispatch {
}
export interface ISliceBase<TModel, Id extends EntityId = EntityId> {
    status: EFetchStatus
    data: EntityState<TModel, Id>
    requestedId?: string
}


interface ICRUDBase<TModel, Id extends keyof TModel> {
    Create: (model: Partial<TModel>) => Promise<void>
    Update: (Id: TModel[Id], model: Partial<TModel>) => Promise<void>
    Delete: (Id: TModel[Id], model?: Partial<TModel>) => Promise<void>
}

export type CRUDActionReduxType<TModel, Id extends keyof TModel, Key extends keyof ICRUDBase<TModel, Id> = keyof ICRUDBase<TModel, Id>> = Pick<
    ICRUDBase<TModel, Id>,
    Key
>


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

