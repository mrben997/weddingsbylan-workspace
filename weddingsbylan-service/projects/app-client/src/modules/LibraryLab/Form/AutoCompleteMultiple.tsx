import React, { useRef } from 'react'
import { Autocomplete, Chip, Popper, TextField } from '@mui/material'

interface ErrorProps {
  error?: boolean
  message?: string
}

export interface ICreateAutoCompleteMultiple extends ErrorProps {
  onChange?: (data: string[]) => void
  onBlur?: () => void
  title?: string
  defaultValue?: string[]
  options?: string[]
  name?: string
  popperStyle?: React.CSSProperties
  fullWidth?: boolean
  freeSolo?: boolean
  size?: 'small' | 'medium'
}

type TOnChangeValue = (event: React.SyntheticEvent<Element, Event>, value: string[]) => void

export const CreateAutoCompleteMultiple = function () {
  const SelectBase: React.FC<ICreateAutoCompleteMultiple> = (props) => {
    const refInput = useRef<HTMLInputElement>(null)

    const onChangeValue = React.useCallback<TOnChangeValue>(
      (_, option) => {
        if (refInput.current) {
          refInput.current.value = option?.length ? JSON.stringify(option) : ''
        }
        props.onChange && props.onChange(option)
      },
      [props]
    )

    return (
      <React.Fragment>
        <Autocomplete
          fullWidth={props.fullWidth}
          options={props.options ?? []}
          multiple
          freeSolo={props.freeSolo}
          onChange={onChangeValue}
          filterSelectedOptions
          defaultValue={props.defaultValue}
          PopperComponent={(p) => <Popper {...p} style={{ ...(p.style || {}), ...(props.popperStyle || {}) }} />}
          size={props.size}
          renderTags={(value: readonly string[], getTagProps) => {
            return value.map((option: string, index: number) => (
              <Chip {...getTagProps({ index })} key={index} sx={{ fontWeight: 'bold', fontSize: '0.75rem' }} variant='outlined' label={option} />
            ))
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size={props.size}
              label={props.title || 'title'}
              onBlur={props.onBlur}
              error={props.error}
              minRows={1}
              maxRows={1}
              placeholder='Enter text'
              helperText={props.message}
              inputProps={{ ...params.inputProps, autoComplete: 'off' }}
            />
          )}
        />
        <input ref={refInput} hidden name={props.name} defaultValue={props.defaultValue ? JSON.stringify(props.defaultValue) : ''} />
      </React.Fragment>
    )
  }
  return SelectBase
}
