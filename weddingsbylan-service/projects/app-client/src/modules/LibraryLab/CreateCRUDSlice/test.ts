// import { createSlice } from '@reduxjs/toolkit'
// import SliceBaseCreator from './SliceCreator'
// import { ISliceBase } from '@lib/ReduxBase'

// interface IParam<TModel, TState extends ISliceBase<TModel>> {
//   name: string
//   creator: SliceBaseCreator<TModel, TState>
//   // dynamics: (creator: SliceBaseCreator<TModel, TState>) => SliceBaseCreator<TModel, TState>
// }
// const createSliceDynamic = function <
//   TModel,
//   TCreator extends SliceBaseCreator<TModel, TState>,
//   TState extends ISliceBase<TModel> = ISliceBase<TModel>,
// >(param: IParam<TModel, TState>) {
//   // const creator = param.dynamics(new SliceBaseCreator<TModel, TState>())
//   // return createSlice({
//   //   name: param.name,
//   //   initialState: creator.build().initialState,
//   //   reducers: {
//   //     ...creator.build().reducers,
//   //     test: (state, action) => {}
//   //   }
//   // })

//   return createSlice({
//     name: param.name,
//     initialState: (param.creator as TCreator).build().initialState,
//     reducers: {
//       ...(param.creator as TCreator).build().reducers,
//       test: (state, action) => {}
//     }
//   })
// }

// interface IData {
//   Id: string
// }

// interface IStateTets extends ISliceBase<IData> {}

// const test = new SliceBaseCreator<IData, IStateTets>().CRUD()

// const test2 = createSliceDynamic<IData, typeof test>({
//   name: 'hello',
//   // dynamics: (x) => x.CRUD(),
//   creator: test
// })

// test2.actions.
export {}
