import { FC, useState } from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import { ErrorProps } from './Error'

export interface InputOutlineProps extends ErrorProps {
  Title: string
  MaxLength: number
  rows?: number
  minRows?: number
  maxRows?: number
  className?: string
  onChangeValue?: (text: string) => void
  onBlur?: (text: string) => void
  defaultValue?: string
  innerInput?: React.RefObject<HTMLInputElement>
  disabled?: boolean
  inputProps?: TextFieldProps
}
export const InputOutline: FC<InputOutlineProps> = (props) => {
  const [state, SetState] = useState({
    value: props.defaultValue
  })
  const Title = `${props.Title} (${state.value?.length ?? 0}/${props.MaxLength})`
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChangeValue && props.onChangeValue(event.target.value)
    SetState((st) => ({ ...st, value: event.target.value }))
  }
  return (
    <TextField
      id={`outlined-adornment-${props.Title}`}
      className={props.className}
      fullWidth
      variant='outlined'
      label={Title}
      error={props.error}
      disabled={props.disabled}
      helperText={props.message}
      onChange={handleChange}
      defaultValue={props.defaultValue}
      onBlur={() => props.onBlur && props.onBlur(state.value || '')}
      rows={props.rows}
      minRows={props.minRows}
      maxRows={props.maxRows}
      inputProps={{ maxLength: props.MaxLength }}
      inputRef={props.innerInput}
      multiline
      {...(props.inputProps ?? {})}
    />
  )
}
export default InputOutline
