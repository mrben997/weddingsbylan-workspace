import { useMemo } from 'react'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { IAttachItem } from './types'
import AttachWidget from './widget'
import { tryParseArray } from './helpers'

export type RenderCellFunction = (params: GridRenderCellParams) => React.ReactNode

export interface IOnChangeParams {
  value: any
  row: any
  items: IAttachItem[]
  options?: { isSave?: boolean; signal?: AbortSignal }
}

export interface ICellAttachWidgetParams {
  onChange?: (params: IOnChangeParams) => Promise<void>
}

export function createCellAttachWidget(params: ICellAttachWidgetParams): RenderCellFunction {
  const cellAttachWidget: RenderCellFunction = ({ value, row }) => {
    const val = useMemo<IAttachItem[]>(() => {
      const parsed = tryParseArray<IAttachItem>(value, [])
      return parsed
    }, [value])

    return (
      <AttachWidget
        value={val}
        onChange={async (i, o) => {
          if (!params.onChange) return
          return params.onChange({ value, row, items: i, options: o })
        }}
      />
    )
  }
  return cellAttachWidget
}
export default createCellAttachWidget
