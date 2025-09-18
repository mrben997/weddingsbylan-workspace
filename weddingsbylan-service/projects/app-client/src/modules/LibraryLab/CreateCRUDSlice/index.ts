// import {
//   createEntityAdapter,
//   Draft,
//   EntityState,
//   IdSelector,
//   PayloadAction,
//   SliceCaseReducers,
//   Update,
//   ValidateSliceCaseReducers
// } from '@reduxjs/toolkit'
// import SliceBaseHelper from './helper'

// interface IModeCRUDParam<TModel, TState> {
//   selectId: IdSelector<TModel>
//   adapterSelectData: (state: Draft<TState>) => EntityState<TModel>
// }

// export const getModeCRUD = <TModel, TState>(param?: IModeCRUDParam<TModel, TState>) => {
//   if (!param) return null
//   const SliceAdapter = createEntityAdapter<TModel>({ selectId: param.selectId })
//   return {
//     initialState: {
//       data: SliceAdapter.getInitialState()
//     },
//     reducers: {
//       Update: (state: Draft<TState>, action: PayloadAction<Update<TModel>>) => {
//         SliceAdapter.updateOne(param.adapterSelectData(state), action.payload)
//       },
//       Add: (state: Draft<TState>, action: PayloadAction<TModel>) => {
//         SliceAdapter.addOne(param.adapterSelectData(state), action.payload)
//       },
//       Remove: (state: Draft<TState>, action: PayloadAction<string | number>) => {
//         SliceAdapter.removeOne(param.adapterSelectData(state), action.payload)
//       },
//       RemoveAll: (state: Draft<TState>) => {
//         SliceAdapter.removeAll(param.adapterSelectData(state))
//       },
//       UpsetMany: (state: Draft<TState>, action: PayloadAction<TModel[]>) => {
//         SliceAdapter.removeAll(param.adapterSelectData(state))
//         SliceAdapter.upsertMany(param.adapterSelectData(state), action.payload)
//       }
//     }
//   }
// }

// enum EModeType {
//   CRUD = 'CRUD',
//   // Table = 'Table'
// }

// type TModeParam<TModel, TState> = {
//   [EModeType.CRUD]?: IModeCRUDParam<TModel, TState>
// }

// export const LabCreateSliceBaseInitial = function <TModel, TState>(mode: TModeParam<TModel, TState> = {}) {
//   const data = Object.keys(mode)
//   // let initialState: IS = {}
//   // let reducers: RD = {}
//   // return data.reduce<{ initialState: IS; reducers: RD }>(
//   //   (obj, key) => {
//   //     return obj
//   //   },
//   //   { initialState: {}, reducers: {} }
//   // )

//   // data.forEach((key) => {
//   //   switch (key) {
//   //     case EModeType.CRUD: {
//   //       const modeInstance = getModeCRUD(mode[key])
//   //       initialState = { ...initialState, ...modeInstance.initialState }
//   //       reducers = { ...reducers, ...modeInstance.reducers }
//   //       break
//   //     }
//   //     default:
//   //       break
//   //   }
//   // })
//   const modeInstance = getModeCRUD(mode[EModeType.CRUD])
//   const reducers = {
//     ...(modeInstance ? modeInstance.reducers : {})
//   }
//   return {
//     initialState: {
//       ...(modeInstance ? modeInstance.initialState : {})
//     },
//     reducers: reducers
//   }
// }
// export type LabCreateSliceBaseInitialType<TModel, TState> = ReturnType<typeof LabCreateSliceBaseInitial<TModel, TState>>

export {}