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
    mapProps = (): SelectProps => {
      console.log('select simple render')
      console.log(this.getDefaultValue())

      const label = this.getLabel()
      const tfp: SelectProps = {
        id: this.props.name?.toString(),
        labelId: this.props.name?.toString() + label,
        name: this.props.name?.toString(),
        label: label,
        defaultValue: this.getDefaultValue(),
        onChange: (event) => {
          const value: string = event.target.value + ''
          const temp = this.getOptions().find((x) => x.value?.toString() === value)
          if (temp && this.props.onChange) {
            this.props.onChange(temp)
          }
        },
        disabled: this.props.disabled,
        fullWidth: true
      }
      const selectProps = this.props.slots?.selectProps ?? options?.selectProps
      return MergeObjects({}, tfp, selectProps)
    }
    render() {
      const data = this.getOptions()
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
    getDefaultValue = (currentProps?: IProps) => {
      const { data, name } = currentProps ?? this.props
      console.log('get default value', data, name, this.props.defaultValue)

      const dValue = this.props.defaultValue?.toString() ?? (name ? data?.[name]?.toString() : undefined)
      return dValue ?? this.getOptions()[0].value
    }
    getOptions = (): ISelectSimpleOption[] => {
      return this.props.options ?? options?.options ?? []
    }
  }
  return SelectSimple
}
export default CreateSelectSimple
export type SelectSimpleType<TModel> = ReturnType<typeof CreateSelectSimple<TModel>>
