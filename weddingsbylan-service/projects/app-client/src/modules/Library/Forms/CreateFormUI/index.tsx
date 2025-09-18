import React, { Component } from 'react'
import { Box, Button, Divider, Fade, FormControl, FormHelperText, InputBase, styled, SxProps, Typography, Theme } from '@mui/material'
import { getErrorMessage } from '../helper'
import { IFormBase, IFormInputBase } from '../types'
import FormValidator from '../Validator'
import CreateFormBase from '../CreateFormBase'

export interface IFormUIItemProps<TModel, TOptions = any> extends IFormInputBase<TModel> {
  options?: TOptions
}

export interface IFormUIConfig<TModel, TOptions = any> {
  name: keyof TModel
  label?: string
  placeholder?: string
  disabled?: boolean
  allwaysDisplay?: boolean
  options?: Omit<TOptions, 'sx'> & { sx?: SxProps<Theme> }
  itemElement?: React.ComponentType<IFormUIItemProps<TModel, TOptions>>
  inputElement?: React.ComponentType<IFormUIItemProps<TModel, TOptions>>
}

type TSubmitMapping<TModel> = (value: Partial<TModel>, oldValue?: TModel) => Partial<TModel>

interface IOptions<TModel, TOptions> {
  alwaysAction?: boolean
  itemElementDefault?: React.ComponentType<IFormUIItemProps<TModel, TOptions>>
  inputElementDefault?: React.ComponentType<IFormUIItemProps<TModel, TOptions>>
}

export interface IFormUIParam<TModel, TOptions> {
  title: JSX.Element | string
  description?: JSX.Element | string
  configs: IFormUIConfig<TModel, TOptions>[]
  validate?: FormValidator<Partial<TModel>>
  submitMapping?: TSubmitMapping<TModel>
  options?: IOptions<TModel, TOptions>
}

const CreateFormUI = function <TModel, TOptions = any>(param: IFormUIParam<TModel, TOptions>) {
  // ========= ========= ========= Content ========= ========= =========
  class InputSimple extends Component<IFormUIItemProps<TModel>> {
    render() {
      const keytext = this.props.name?.toString() ?? '' + new Date().getTime()
      const eMessage = getErrorMessage(this.props.messageErrors, this.props.name)
      const { name, data } = this.props
      const dValue = this.props.defaultValue ?? (name ? data?.[name] : undefined)
      return (
        <FormControl key={dValue + this.props.name?.toString()} fullWidth error={eMessage.error}>
          <InputBase
            aria-describedby={keytext}
            size='small'
            onBlur={() => {
              if (!this.props.name) return
              this.props.onBlur && this.props.onBlur(this.props.name)
            }}
            name={this.props.name?.toString()}
            defaultValue={dValue}
            placeholder={this.props.placeholder ?? 'none'}
            disabled={this.props.disabled}
          />
          <FormHelperText component='div' id={keytext} sx={{ position: 'absolute', left: 0, bottom: '-8px', m: 0 }}>
            <Typography sx={{ fontSize: '12px' }}>{eMessage.message}</Typography>
          </FormHelperText>
        </FormControl>
      )
    }
  }
  interface IContentProps extends IFormBase<TModel> {
    disabled?: boolean
  }
  class Content extends Component<IContentProps> {
    getItemConfigs = (): IFormUIConfig<TModel>[] => {
      return param.configs.filter((item) => !(item.allwaysDisplay === false))
    }
    render() {
      const items = this.getItemConfigs()
      return (
        <Box sx={{ marginTop: '9px', marginBottom: '-1px' }}>
          {items.map((item, index) => (
            <React.Fragment key={item.name.toString() + index}>{this.renderItem(item)}</React.Fragment>
          ))}
        </Box>
      )
    }
    renderItem = (item: IFormUIConfig<TModel>) => {
      const ItemElementDefault = param.options?.itemElementDefault
      if (!!ItemElementDefault) {
        return <ItemElementDefault {...this.props} name={item.name} label={item.label} options={item.options} />
      }
      const title = item.label ?? item.name.toString()
      const dValue = this.props.data?.[item.name]
      return (
        <React.Fragment key={dValue + item.name?.toString()}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', padding: '14px 0', ...item.options?.sx }}>
            <Typography sx={{ fontSize: '16px', width: '240px', mt: '2px' }}>{title}</Typography>
            <Box sx={{ mb: '-5px', flex: 1, mr: '18px' }}>{this.renderInput(item)}</Box>
          </Box>
          <Divider />
        </React.Fragment>
      )
    }
    renderInput = (item: IFormUIConfig<TModel>) => {
      let InputElement = item.inputElement ?? param.options?.inputElementDefault ?? InputSimple
      return (
        <InputElement
          {...this.props}
          name={item.name}
          disabled={this.props.disabled ?? item.disabled}
          label={item.label}
          placeholder={item.placeholder}
        />
      )
    }
  }

  const formValidate = param.validate ? param.validate : new FormValidator<Partial<TModel>>({})
  const FormBaseInstance = CreateFormBase<TModel>()

  interface FormUiBasicProps {
    data?: Partial<TModel>
    onSubmit?: (value: Partial<TModel>) => Promise<void>
    disabled?: boolean
    alwaysAction?: boolean
  }
  class FormUi extends Component<FormUiBasicProps> {
    render() {
      const alwaysAction = this.props.alwaysAction ?? param.options?.alwaysAction
      return (
        <FormBaseInstance.Form validate={formValidate} onSubmit={this.handleSubmit}>
          {FormBaseInstance.ContextMapping((context) => (
            <Wrap>
              <Box sx={{ mb: '3px' }}>{this.renderTitle()}</Box>
              <Fade in={!!param.description} unmountOnExit>
                <Box height={22}>{this.renderDescription()}</Box>
              </Fade>
              <Content onBlur={context.onBlur} messageErrors={context.messageErrors} data={this.props.data} disabled={this.props.disabled} />
              {alwaysAction !== false && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: '9px', pr: '12px' }}>
                  <Button color='primary' type='submit' disabled={this.props.disabled} sx={{ fontWeight: 600, textTransform: 'unset' }}>
                    Save
                  </Button>
                </Box>
              )}
            </Wrap>
          ))}
        </FormBaseInstance.Form>
      )
    }
    renderTitle = () => {
      if (typeof param.title === 'string') {
        return <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>{param.title}</Typography>
      }
      return param.title ?? <></>
    }
    renderDescription = () => {
      if (typeof param.description === 'string') {
        return <Typography sx={{ fontSize: '14px' }}>{param.description}</Typography>
      }
      return param.description ?? <></>
    }
    handleSubmit = async (value: Partial<TModel>) => {
      this.props.onSubmit && this.props.onSubmit({ ...this.props.data, ...value })
    }
  }
  return FormUi
}
export default CreateFormUI
export type FormUIType<TModel> = InstanceType<ReturnType<typeof CreateFormUI<TModel>>>

// class ActionBarInternal extends Component {
//   render() {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
//         <Button variant='contained' type='submit'>
//           Submit
//         </Button>
//       </Box>
//     )
//   }
// }

const Wrap = styled(Box)({
  padding: '24px 0 0 24px',
  border: '1px solid #DADCE0',
  marginTop: '24px',
  borderRadius: '4px',
  position: 'relative',
  overflow: 'hidden',
  '& .MuiFormHelperText-root.Mui-error p': {
    color: '#FF3419 !important'
  }
})
