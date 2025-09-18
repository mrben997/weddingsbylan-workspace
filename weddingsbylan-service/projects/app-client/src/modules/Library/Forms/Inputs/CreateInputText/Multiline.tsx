import React, { Component } from 'react'
import { TextFieldProps } from '@mui/material'
import CreateInputText from '.'
import { MergeObjects } from '../../helper'
import { IFormInputBase } from '../../types'

interface IOptions {
  maxLength?: number
  multiline?: { rows?: number; maxRows?: number; minRows?: number }
}

interface ISlots {
  textFieldProps?: TextFieldProps
  options?: IOptions
}

interface IParams {
  options?: IOptions
}

export const CreateInputTextMultiline = function <TModel>(params?: IParams) {
  const InputTextComponent = CreateInputText<TModel>({ options: { maxLength: params?.options?.maxLength ?? 250 } })

  interface IProps extends IFormInputBase<TModel> {
    options?: ISlots
}

  class InputTextMultiline extends Component<IProps> {
    render() {
      const { options: slots, ...otherProps } = this.props
      const options = this.getOptions()
      return (
        <InputTextComponent
          options={{
            maxLength: options?.maxLength ?? params?.options?.maxLength,
            textFieldProps: { multiline: true, ...options?.multiline }
          }}
          {...otherProps}
        />
      )
    }

    getOptions = () => {
      return MergeObjects({}, this.props.options?.options ?? params?.options)
    }
  }

  return InputTextMultiline
}
export default CreateInputTextMultiline
