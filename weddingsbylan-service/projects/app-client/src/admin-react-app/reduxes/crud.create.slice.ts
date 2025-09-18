import { NoInfer } from 'react-redux'
import { createEntityAdapter, createSlice, EntityId, Slice, SliceCaseReducers } from '@reduxjs/toolkit'
import { ActionReducerMapBuilder, EntityAdapter, IdSelector, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { ISliceBase, EFetchStatus } from './types'
import { CRUDActionRedux } from './crud.action.redux'

interface ICreateCRUDSliceOption<TModel, Id extends EntityId, TSliceState extends ISliceBase<TModel, Id>, CaseReducers extends SliceCaseReducers<TSliceState>> {
    name: string
    selectId: IdSelector<TModel, Id>
    Initial?: (state: ISliceBase<TModel>) => TSliceState
    extraReducers?: (builder: ActionReducerMapBuilder<NoInfer<TSliceState>>, adapter: EntityAdapter<TModel, Id>) => void
    reducers?: ValidateSliceCaseReducers<TSliceState, CaseReducers>
}
const CreateCRUDSlice = <TModel>() => {
    return <CR extends SliceCaseReducers<TSliceState>, Id extends EntityId, TSliceState extends ISliceBase<TModel, Id> = ISliceBase<TModel, Id>>(
        options: ICreateCRUDSliceOption<TModel, Id, TSliceState, CR>
    ) => {
        const SliceAdapter = createEntityAdapter<TModel, Id>({
            selectId: options.selectId
        })
        // Define the initial state using that type

        const Initial = options.Initial ? options.Initial : (x: any) => x
        const initialState: TSliceState = Initial({
            status: EFetchStatus.Loading,
            data: SliceAdapter.getInitialState()
        })

        const ModelSlice = createSlice({
            name: options.name,
            // `createSlice` will infer the state type from the `initialState` argument
            initialState,
            reducers: {
                ...CRUDActionRedux(SliceAdapter),
                ...(options.reducers ?? {})
            },
            extraReducers: (builder) => options.extraReducers && options.extraReducers(builder, SliceAdapter)
        })
        return ModelSlice as Slice<TSliceState, ReturnType<typeof CRUDActionRedux> & CR, string>
    }
}
export default CreateCRUDSlice