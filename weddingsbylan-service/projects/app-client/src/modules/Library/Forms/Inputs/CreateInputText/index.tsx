import React, { Component } from 'react'
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material'
import { IFormInputBase } from '../../types'
import { getErrorMessage, MergeObjects } from '../../helper'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export * from './Multiline'

interface ISlots {
  maxLength?: number
  textFieldProps?: TextFieldProps
}
interface IParams {
  options: Omit<ISlots, 'disabledLabel'>
}
const CreateInputText = function <TModel>(params?: IParams) {
  interface IProps extends IFormInputBase<TModel> {
    options?: ISlots
  }
  interface IState {
    value?: string
    showPassword: boolean
  }
  class InputText extends Component<IProps, IState> {
    constructor(props: IProps) {
      super(props)
      this.state = { value: props.defaultValue?.toString() ?? '', showPassword: false }
    }
    handleClickShowPassword = () => this.setState({ showPassword: !this.state.showPassword });
    isPassword = () => {
      return params?.options.textFieldProps?.type === 'password'
    }
    render() {
      const slots = this.getSlots()
      const errorMessage = getErrorMessage(this.props.messageErrors, this.props.name)
      const dValue = this.getDefaultValue()
      const tfp: TextFieldProps = {
        fullWidth: true,
        variant: 'outlined',
        name: this.props.name?.toString(),
        error: errorMessage.error,
        helperText: errorMessage.message,
        defaultValue: dValue,
        disabled: this.props.disabled,
        onBlur: () => {
          if (!this.props.name) return
          this.props.onBlur && this.props.onBlur(this.props.name)
        },
        label: this.getLabel(),
        placeholder: this.props.placeholder,
        onChange: this.handleChange
      }
      if (slots?.maxLength) tfp.inputProps = { ...tfp.inputProps, maxLength: slots.maxLength }
      const mapTextFieldProps = MergeObjects<TextFieldProps>({}, tfp, slots?.textFieldProps)
      return (
        <React.Fragment>
          {!!this.props.disabled && <input hidden name={this.props.name?.toString()} defaultValue={dValue} />}
          <TextField {...mapTextFieldProps}
            type={!this.isPassword() || this.state.showPassword ? 'text' : 'password'}
            slotProps={{
              input: {
                endAdornment: this.isPassword() ? <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    edge="end"
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment> : undefined
              }
            }}
          />
        </React.Fragment>
      )
    }

    getDefaultValue = () => {
      const { data, name } = this.props
      return this.props.defaultValue ?? (!!data && !!name ? data[name]?.toString() : undefined)
    }

    getLabel = () => {
      if (!this.props.label) return
      const slots = this.getSlots()
      if (!slots?.maxLength) return this.props.label
      return `${this.props.label} (${this.state.value?.length ?? 0}/${slots.maxLength})`
    }

    getSlots = () => {
      return MergeObjects<ISlots>({}, this.props.options, params?.options)
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState((st) => ({ ...st, value: event.target.value }))
    }
  }
  return InputText
}
export default CreateInputText
export type InputTextType<TModel> = ReturnType<typeof CreateInputText<TModel>>
