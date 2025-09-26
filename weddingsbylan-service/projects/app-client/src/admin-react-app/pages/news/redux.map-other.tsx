import { FC, useMemo } from 'react'
import { TNewsProps } from './types'
import { AttachWidget, IAttachItem } from '@/modules/LibraryLab/attach-widget'
import { TryParseArray } from '@/modules/Library/Helpers'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from './redux.map'
import { INews } from '@/admin-react-app/model'

interface IAttachmentCellProps extends TNewsProps {
  value: any
  row: INews
}

const AttachmentCellBase: FC<IAttachmentCellProps> = (props) => {
  const { row, value } = props

  const val = useMemo<IAttachItem[]>(() => {
    const parsed = TryParseArray<IAttachItem>(value, [])
    return parsed
  }, [value])

  const handleChange = async (items: IAttachItem[]) => {
    const { UpdatePatch } = props
    if (!UpdatePatch || !row.Id) return

    // await UpdatePatch(row.Id, { Description: JSON.stringify(items) })
  }

  return (
    <AttachWidget
      value={val}
      onChange={async (x) => {
        console.log(x)
      }}
    />
  )
}

export const AttachmentMapRedux = connect(mapStateToProps, mapDispatchToProps)(AttachmentCellBase)
