// import { ISliceBase } from '@lib/ReduxBase'
// import { ActionReducerMapBuilder, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
// import { CaseReducer, createEntityAdapter, createSlice, EntityState, IdSelector, SliceCaseReducers, Update } from '@reduxjs/toolkit'

// interface IStateCRUD<TModel> {
//   Data: EntityState<TModel>
// }
// interface IReducerCRUD<TState, TModel> extends SliceCaseReducers<TState> {
//   Update: CaseReducer<TState, { payload: Update<TModel>; type: string }>
//   Add: CaseReducer<TState, { payload: TModel; type: string }>
//   Remove: CaseReducer<TState, { payload: string; type: string }>
//   RemoveAll: CaseReducer<TState, { type: string }>
//   UpsetMany: CaseReducer<TState, { payload: TModel[]; type: string }>
// }

// interface IStateTable {
//   tableInfo: string
// }
// interface IReducerTable<TState, TModel> extends SliceCaseReducers<TState> {
//   onTableChange: CaseReducer<TState, { payload: { id: string }; type: string }>
// }

// type IParam<TModel, TState extends ISliceBase<TModel>> = {
//   name: string
//   extraReducers?: (builder: ActionReducerMapBuilder<NoInfer<TState>>) => void
// }

// export default class SliceBaseCreator<
//   TModel,
//   TState extends ISliceBase<TModel> = ISliceBase<TModel>,
//   Re extends SliceCaseReducers<any> = SliceCaseReducers<{}>
// > {
//   private initial: any = {
//     initialState: {} as TState,
//     reducers: {} as Re
//   }
//   private param: IParam<TModel, TState>
//   constructor(param: IParam<TModel, TState>) {
//     this.param = param
//   }

//   CRUD = (param: { selectId: IdSelector<TModel> }) => {
//     this.initial.initialState = { ...this.initial.initialState, Data: [] } as IStateCRUD<TModel>
//     const SliceAdapter = createEntityAdapter<TModel>({ selectId: param.selectId })
//     const reducers: IReducerCRUD<IStateCRUD<TModel>, TModel> = {
//       Update: (state, action) => {
//         SliceAdapter.updateOne(state.Data as EntityState<TModel>, action.payload)
//       },
//       Add: (state, action) => {
//         SliceAdapter.addOne(state.Data as EntityState<TModel>, action.payload)
//       },
//       Remove: (state, action) => {
//         SliceAdapter.removeOne(state.Data as EntityState<TModel>, action.payload)
//       },
//       RemoveAll: (state) => {
//         SliceAdapter.removeAll(state.Data as EntityState<TModel>)
//       },
//       UpsetMany: (state, action) => {
//         SliceAdapter.removeAll(state.Data as EntityState<TModel>)
//         SliceAdapter.upsertMany(state.Data as EntityState<TModel>, action.payload)
//       }
//     }
//     this.initial.reducers = { ...this.initial.reducers, ...reducers } as Re & IReducerCRUD<TState, TModel>
//     return this as any as SliceBaseCreator<TModel, TState & IStateCRUD<TModel>, Re & IReducerCRUD<TState, TModel>>
//   }

//   Table = () => {
//     this.initial.initialState = { tableInfo: 'hello' } as IStateTable
//     const reducers: IReducerTable<TState, TModel> = {
//       onTableChange: (state, action) => {}
//     }

//     this.initial.reducers = {
//       ...this.initial.reducers,
//       ...reducers
//     } as Re & IReducerTable<TState, TModel>
//     return this as any as SliceBaseCreator<TModel, TState & IStateTable, Re & IReducerTable<TState, TModel>>
//   }

//   build = () => ({
//     initialState: this.initial.initialState as TState,
//     reducers: this.initial.reducers as Re
//   })

//   creteSlice = () => {
//     return createSlice({
//       name: this.param.name,
//       initialState: this.initial.initialState as TState,
//       reducers: this.initial.reducers as ValidateSliceCaseReducers<TState, Re>,
//       extraReducers: (builder) => this.param.extraReducers && this.param.extraReducers(builder)
//     })
//   }
// }

// interface IData {
//   Id: string
// }

// const SliceInstance = new SliceBaseCreator<IData>({
//   name: 'red',
//   extraReducers: (builder) => {}
// })

// const slice = SliceInstance.CRUD({ selectId: (x) => x.Id })
//   .Table()
//   .creteSlice()

export {}
