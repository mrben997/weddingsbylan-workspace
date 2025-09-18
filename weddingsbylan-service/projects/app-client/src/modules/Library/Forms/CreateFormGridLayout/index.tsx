import React, { Component, Fragment } from 'react'
import { Box, Button, Grid, GridProps, styled, SxProps, Theme } from '@mui/material'
import { CreateInputText } from '../Inputs'
import FormValidator from '../Validator'
import CreateFormBase from '../CreateFormBase'
import { MapGlobalModalContext } from '../../ApiContext'
import { IFormBase, IFormInputBase } from '../types'

export interface IFormGridLayoutConfig<TModel, TC extends IFormInputBase<TModel> = IFormInputBase<TModel>> {
  key: keyof TModel
  label?: string
  reponsives?: GridProps
  inputElement?: React.ComponentType<TC>
  disabled?: boolean
  /**
   * @param data TModel
   * @returns boolean
   * @default true
   */
  alwaysDisplayed?: (data?: Partial<TModel>) => boolean
}
type TSubmitMapping<TModel> = (value: Partial<TModel>, oldValue?: TModel) => Partial<TModel>

// ========= ========= ========= Main ========= ========= =========
interface IOptions<TModel> {
  action?: React.ComponentType<IFormBase<TModel>>
  actionBefore?: JSX.Element
}
export interface ISlots<TModel> {
  sx?: SxProps<Theme>
  action?: React.ComponentType<IFormBase<TModel>>
  components?: {
    top?: React.ReactNode
    bottom?: React.ReactNode
  }
}
interface IParams<TModel> {
  configs: IFormGridLayoutConfig<TModel>[]
  validate: FormValidator<Partial<TModel>>
  submitMapping?: TSubmitMapping<TModel>
  options?: IOptions<TModel>
}


const CreateFormGridLayout = function <TModel>(param: IParams<TModel>) {
  interface IProps extends IFormBase<TModel> {
    slots?: ISlots<TModel>
  }
  const InputTextInstance = CreateInputText<TModel>({ options: { maxLength: 1000 } })
  class FormContent extends Component<IProps> {
    render() {
      return (
        <WrapContent sx={this.props.slots?.sx}>
          {this.props.slots?.components?.top && this.props.slots?.components.top}
          <Grid container spacing={2}>
            {param.configs.map((config, index) => {
              if (config.alwaysDisplayed && config.alwaysDisplayed(this.props.data) === false) {
                return <Fragment key={config.key.toString() + index} />
              }
              return (
                <Fragment key={config.key.toString() + index}>
                  <Grid item xs={12} {...config.reponsives}>
                    {this.renderFormFieldElement(config)}
                  </Grid>
                </Fragment>
              )
            })}
          </Grid>
          {this.props.slots?.components?.bottom && this.props.slots?.components.bottom}
        </WrapContent>
      )
    }
    renderFormFieldElement = (config: IFormGridLayoutConfig<TModel>) => {
      const { slots, ...otherProps } = this.props
      const ElementComponent = config.inputElement ?? InputTextInstance
      const disabled = config.disabled
      return <ElementComponent {...otherProps} name={config.key} label={config.label} disabled={disabled} />
    }
  }

  class ActionInternal extends Component<IFormBase<TModel> & {
    innerRefForm?: React.RefObject<HTMLFormElement>
  }> {
    onClick = () => {
      this.props.innerRefForm?.current?.requestSubmit()
    }
    render() {
      return (
        <WrapAction>
          <Box sx={{ flex: 1 }}>{param.options?.actionBefore}</Box>
          <Button type='submit' onClick={this.onClick} variant='contained' size='small'>
            Submit
          </Button>
        </WrapAction>
      )
    }
  }

  const FormBaseInstance = CreateFormBase<TModel>()
  interface IFormGridLayoutProps {
    data?: TModel
    innerRefForm?: React.RefObject<HTMLFormElement>
    onSubmit: (value: Partial<TModel>) => Promise<void>
    sx?: SxProps<Theme>
    slots?: ISlots<TModel>
    isSubmit?: boolean
    closeState?: {
      Success?: boolean
      Fail?: boolean
    }
    InputHiddens?: React.ReactNode
    onSubmitCallback?: (state: { status: "Error" | "Success", close?: () => void }) => void
  }
  interface IState {
    loadding?: boolean
  }
  class FormGridLayout extends Component<IFormGridLayoutProps, IState> {
    constructor(props: IFormGridLayoutProps) {
      super(props)
      this.state = { loadding: false }
    }
    render() {
      const Actions = param.options?.action ?? this.props.slots?.action ?? ((p) => <ActionInternal {...p} innerRefForm={this.props.innerRefForm} />)
      return MapGlobalModalContext(({ CloseModal }) => (
        <FormBaseInstance.Form
          validate={param.validate}
          innerRefForm={this.props.innerRefForm}
          onSubmit={(v) => this.onSubmit(v, () => CloseModal())}
          sx={{ ...this.props.sx, opacity: this.state.loadding ? 0.7 : 1, pointerEvents: this.state.loadding ? 'none' : 'auto' }}
        >
          {FormBaseInstance.ContextMapping((context) => {
            return (
              <>
                {this.props.InputHiddens ?? <></>}
                <FormContent onBlur={context.onBlur} messageErrors={context.messageErrors} {...this.props} />
                {this.props.isSubmit !== false ? <Actions {...context} /> : <></>}
              </>
            )
          })}
        </FormBaseInstance.Form >
      ))
    }

    loading = () => this.setState({ loadding: true })
    unloading = () => this.setState({ loadding: false })

    onSubmit = async (value: Partial<TModel>, close?: () => void) => {
      const mapping = param.submitMapping ?? this.submitMapping
      const data = mapping(value, this.props.data)
      try {
        this.loading()
        await this.props.onSubmit(data)
        if (!this.props.closeState || this.props.closeState.Success !== false) this.onSubmitCallback("Success", close)
      } catch {
        if (this.props.closeState && this.props.closeState.Fail === true) {
          this.onSubmitCallback("Error", close)
          return
        }
      } finally {
        this.unloading()
      }
    }

    onSubmitCallback = (status: "Error" | "Success", close?: () => void) => {
      if (!this.props.onSubmitCallback) {
        close && close()
      } else {
        this.props.onSubmitCallback({ status, close })
      }
    }

    submitMapping: TSubmitMapping<TModel> = (value, oldValue) => {
      return Object.assign({}, oldValue, value)
    }
  }
  return FormGridLayout
}
export default CreateFormGridLayout

const WrapContent = styled(Box)({
  padding: '16px 12px 3px',
  maxHeight: `calc(100vh - ${48 * 2 + 12 * 2}px)`,
  overflowY: 'auto',
  overflowX: 'hidden'
})

const WrapAction = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '0 12px',
  boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
  position: 'sticky',
  bottom: 0,
  backgroundColor: '#fff',
  zIndex: 1,
  height: '48px'
})
