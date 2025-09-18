import { Draft, PayloadAction, Update, EntityAdapter, EntityState, EntityId } from '@reduxjs/toolkit'
import { ISliceBase } from './types'

export const CRUDActionRedux = <TModel, Id extends EntityId, TState extends ISliceBase<TModel>>(SliceAdapter: EntityAdapter<TModel, Id>) => ({
    Update: (state: Draft<TState>, action: PayloadAction<Update<TModel, Id>>) => {
        SliceAdapter.updateOne(state.data as EntityState<TModel, Id>, action.payload)
    },
    Add: (state: Draft<TState>, action: PayloadAction<TModel>) => {
        SliceAdapter.addOne(state.data as EntityState<TModel, Id>, action.payload)
    },
    Remove: (state: Draft<TState>, action: PayloadAction<Id>) => {
        SliceAdapter.removeOne(state.data as EntityState<TModel, Id>, action.payload)
    },
    RemoveAll: (state: Draft<TState>) => {
        SliceAdapter.removeAll(state.data as EntityState<TModel, Id>)
    },
    UpsetMany: (state: Draft<TState>, action: PayloadAction<TModel[]>) => {
        SliceAdapter.removeAll(state.data as EntityState<TModel, Id>)
        SliceAdapter.upsertMany(state.data as EntityState<TModel, Id>, action.payload)
    }
})
