import React, { FC } from 'react'
import { FormHelperText, styled } from '@mui/material'
import { getErrorMessage, PartialError } from '@/modules/Library/Forms'

export interface ErrorProps {
  error?: boolean
  message?: string
}
type ErrorBoxProps = ErrorProps & {
  position?: 'Top' | 'Bottom'
}
const ErrorBoxBase: FC<React.PropsWithChildren<ErrorBoxProps>> = (props) => {
  let lstContent = [
    <div key={'key1'} className={props.error ? 'border-error' : ''}>
      {props.children}
    </div>,
    <FormHelperText key={'key2'} className='MuiFormHelperText-contained' error={props.error}>
      {props.message}
    </FormHelperText>
  ]
  if (props.position === 'Top') {
    lstContent = lstContent.reverse()
  }
  return <>{lstContent}</>
}
export const ErrorBox = styled(ErrorBoxBase)({
  '.border-error': { border: '1px solid #f44336', borderRadius: '5px' }
})
interface ErrorAllProps {
  MessageError?: PartialError<any>
}
export const ErrorAll: FC<React.PropsWithChildren<ErrorAllProps>> = (props) => {
  return (
    <ErrorBox position={'Top'} {...getErrorMessage(props.MessageError, 'All')}>
      {props.children}
    </ErrorBox>
  )
}
