import React, { Component } from 'react'
import { Collapse, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@mui/material'
import { IFormInputBase } from '../../types'
import { getErrorMessage, MergeObjects } from '../../helper'

export interface ISelectSimpleOption<TModel extends string = string> {
  name: string
  value: TModel
}

interface ISlots {
  selectProps?: Omit<SelectProps, 'variant'>
}

interface IOptions extends ISlots {
  options?: ISelectSimpleOption[]
}

const CreateSelectSimple = function <TModel = any>(options?: IOptions) {
  interface IProps extends IFormInputBase<TModel> {
    options?: ISelectSimpleOption[]
    onChange?: (value: ISelectSimpleOption) => void
    slots?: ISlots
  }
  interface IState {
    value?: string
  }
  class SelectSimple extends Component<IProps, IState> {
    constructor(props: IProps) {
      super(props)
      this.state = { value: this.getDefaultValue()?.toString() }
    }
    mapProps = (): SelectProps => {
      const label = this.getLabel()
      const tfp: SelectProps = {
        id: this.props.name?.toString(),
        labelId: this.props.name?.toString() + label,
        name: this.props.name?.toString(),
        label: label,
        defaultValue: this.getDefaultValue(),
        value: this.state.value,
        onChange: (event) => {
          const value: string = event.target.value + ''
          this.setState({ value }, () => {
            if (!!this.props.name) {
              this.props.onBlur && this.props.onBlur(this.props.name)
            }
            const temp = this.getData().find((x) => x.value?.toString() === value)
            if (!temp) return
            this.props.onChange && this.props.onChange(temp)
          })
        },
        disabled: this.props.disabled,
        fullWidth: true
      }
      const selectProps = this.props.slots?.selectProps ?? options?.selectProps
      return MergeObjects({}, tfp, selectProps)
    }
    render() {
      const data = this.getData()
      const label = this.getLabel()
      const errorMessage = getErrorMessage(this.props.messageErrors, this.props.name)
      return (
        <React.Fragment>
          {!!this.props.disabled && <input hidden name={this.props.name?.toString()} defaultValue={this.getDefaultValue()} />}
          <FormControl fullWidth disabled={this.props.disabled} error={errorMessage.error}>
            <InputLabel id={this.props.name?.toString() + label}>{label}</InputLabel>
            <Select {...this.mapProps()}>
              {data.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <Collapse in={errorMessage.error}>
              <FormHelperText>{errorMessage.message}</FormHelperText>
            </Collapse>
          </FormControl>
        </React.Fragment>
      )
    }
    getLabel = () => {
      if (!!this.props.label && typeof this.props.label === 'string') return this.props.label
      return this.props.name?.toString() ?? ''
    }
    getDefaultValue = () => {
      const { data, name } = this.props
      return this.props.defaultValue?.toString() ?? (!!data && !!name ? data[name] : undefined) ?? this.getData()[0].value
    }
    getData = (): ISelectSimpleOption[] => {
      return this.props.options ?? options?.options ?? []
    }
  }
  return SelectSimple
}
export default CreateSelectSimple
export type SelectSimpleType<TModel> = ReturnType<typeof CreateSelectSimple<TModel>>
