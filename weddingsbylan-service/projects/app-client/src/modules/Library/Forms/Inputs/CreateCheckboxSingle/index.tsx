import React, { Component } from 'react'
import { Checkbox, FormControlLabel, FormControlLabelProps, FormGroup, FormGroupProps, styled, SxProps, Theme, Typography } from '@mui/material'
import { IFormInputBase } from '../../types'
import { getErrorMessage, MergeObjects } from '../../helper'

interface ISlots {
  formControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>
}

interface IParams {
  slots?: ISlots
}

const CreateCheckboxSingle = function <TModel>(params?: IParams) {
  interface IProps extends IFormInputBase<TModel> {
    checked?: boolean
    options?: ISlots
    sx?: SxProps<Theme>
    value?: boolean
    onChange?: (checked: boolean) => void
  }
  interface IState {
    checked: boolean
  }
  class CheckboxSingle extends Component<IProps, IState> {
    constructor(props: IProps) {
      super(props)
      this.state = { checked: this.getDefaultValue() }
    }
    getDefaultValue = () => {
      const { data, name } = this.props
      return this.props.defaultValue ?? (!!data && !!name ? data[name] : false)
    }
    render() {
      const { name } = this.props
      const slots = this.getSlots()
      const mapProps = this.getMapProps()
      const checked = this.props.value ?? this.state.checked
      return (
        <CustomFormGroup {...mapProps.formGroupProps}>
          {!this.props.disabled && <input name={this.props.name?.toString()} hidden value={checked ? "true" : "false"} />}
          <FormControlLabel
            {...slots.formControlLabelProps}
            label={this.renderLabel()}
            control={<Checkbox defaultChecked={checked} disabled={this.props.disabled} />}
            onChange={(_, checked) => {
              this.setState({ checked })
              this.props.onChange && this.props.onChange(checked)
              if (!this.props.name) return
              this.props.onBlur && this.props.onBlur(this.props.name)
            }}
          />
        </CustomFormGroup>
      )
    }
    renderLabel = () => {
      let { name, label } = this.props
      if (typeof label === 'string' || !label) {
        const l = label?.toString() ?? name?.toString() ?? 'Label'
        return <Typography variant='subtitle1'>{l}</Typography>
      }
      return label
    }
    getSlots = () => {
      return MergeObjects<ISlots>({}, params?.slots, this.props.options)
    }
    getMapProps = (): { formGroupProps: FormGroupProps } => {
      const fgp: FormGroupProps = {}
      const eMessage = getErrorMessage(this.props.messageErrors, this.props.name)
      if (this.props.sx) fgp.sx = this.props.sx
      if (eMessage.error) fgp.className = 'error'
      return { formGroupProps: fgp }
    }
  }
  return CheckboxSingle
}
export default CreateCheckboxSingle
export type CheckboxSingleType<TModel> = ReturnType<typeof CreateCheckboxSingle<TModel>>

const CustomFormGroup = styled(FormGroup)({
  '&.error .MuiButtonBase-root': {
    color: '#d81b60'
  }
})
