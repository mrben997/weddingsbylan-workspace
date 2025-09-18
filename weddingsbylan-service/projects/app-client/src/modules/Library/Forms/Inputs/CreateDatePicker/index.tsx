import React, { Component } from 'react'
import { styled } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider, DatePickerProps } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { IFormInputBase } from '../../types'
import { getErrorMessage } from '../../helper'

const formatDefault = 'MM/DD/YYYY'

interface IInputTextParams {
  datePickerProps?: DatePickerProps<Dayjs>
}

const CreateDatePicker = function <TModel extends Object>(params?: IInputTextParams) {
  interface IProps extends IFormInputBase<TModel> {
    format?: string
    options?: {
      datePickerProps: DatePickerProps<Dayjs>
    }
  }

  interface IState {
    value: Dayjs | null
  }

  class DatePicker extends Component<IProps, IState> {
    constructor(props: IProps) {
      super(props)
      this.state = { value: this.getDefaultValue() }
      this.refInput = React.createRef<HTMLInputElement>()
    }

    refInput: React.RefObject<HTMLInputElement>
    render() {
      const label = this.props.label ?? this.props.name?.toString()
      const format = this.props.format ?? formatDefault
      const eMessage = getErrorMessage<TModel>(this.props.messageErrors, this.props.name)
      const dpp = this.props.options?.datePickerProps ?? params?.datePickerProps

      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CustomDatePicker
            label={label}
            format={format}
            views={['day', 'month', 'year']}
            value={this.state.value}
            onChange={this.handleChange}
            disabled={this.props.disabled}
            {...dpp}
            slotProps={{
              ...dpp?.slotProps,
              textField: {
                onBlur: () => {
                  if (!this.props.name) return
                  this.props.onBlur && this.props.onBlur(this.props.name)
                },
                fullWidth: true,
                error: eMessage.error,
                helperText: eMessage.message,
                variant: 'outlined',
                ...dpp?.slotProps?.textField
              }
            }}
          />
          <input
            hidden
            name={this.props.name?.toString()}
            defaultValue={this.getDefaultValue()?.toDate().toISOString()}
            ref={this.refInput}
          />
        </LocalizationProvider>
      )
    }

    handleChange = (newValue: Dayjs | null) => {
      this.setState({ value: newValue }, () => {
        if (!this.refInput.current) return
        this.refInput.current.value = newValue && !isNaN(newValue.toDate().getTime()) ? newValue.toDate().toISOString() : ''
      })
    }

    getDefaultValue = () => {
      const { data, name } = this.props
      const dValue = this.props.defaultValue ?? (name ? data?.[name] : undefined)
      return dValue ? dayjs(dValue.toString()) : null
    }
  }
  return DatePicker
}
export default CreateDatePicker
export type DatePickerType<TModel extends Object> = ReturnType<typeof CreateDatePicker<TModel>>

const CustomDatePicker = styled(DatePicker<Dayjs>)({
  '& .MuiInputBase-root::before, & .MuiInputBase-root::after': {
    borderBottom: 'none !important'
  }
})
