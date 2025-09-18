import React, { Component } from 'react'
import { SxProps, Theme, Typography, TypographyProps } from '@mui/material'
import { IFormInputBase } from '../../types'
import { MergeObjects } from '../../../Helpers'

const CreateTextOnly = function <TModel>() {
  interface IProps extends IFormInputBase<TModel> {
    sx?: SxProps<Theme>
  }
  class TextOnly extends Component<IProps> {
    render() {
      const value = (this.props.data as any)?.[this.props.name]
      return (
        <Typography variant='subtitle2' {...this.mapProps()}>
          {value?.toString() ?? 'no infomation'}
        </Typography>
      )
    }

    mapProps = (): Partial<TypographyProps> => {
      const tp: TypographyProps = {}
      const dValue = this.props.defaultValue ?? (this.props.data as any)?.[this.props.name]
      if (dValue) tp.sx = { color: '#606060' }
      else {
        tp.className = 'noselect'
        tp.sx = { color: '#f0f0f0' }
      }
      return MergeObjects({}, tp, { sx: this.props.sx })
    }
  }

  return TextOnly
}
export default CreateTextOnly
export type TextOnlyType<TModel> = ReturnType<typeof CreateTextOnly<TModel>>
