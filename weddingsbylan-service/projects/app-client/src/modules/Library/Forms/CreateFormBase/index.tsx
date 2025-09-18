import React, { Component } from 'react'
import { Box, SxProps, Theme } from '@mui/material'
import { ConvertFormDataToJson, GetErrorFromResponse, SingleValidate, ValidateMerge } from '../helper'
import FormValidator, { PartialError, SingleRuleValidate } from '../Validator'
import { IFormBase } from '../types'

interface IParam<TModel> {
  validate?: FormValidator<Partial<TModel>>
}

interface IProps<TModel> {
  sx?: SxProps<Theme>
  innerRefForm?: React.RefObject<HTMLFormElement>
  validate?: FormValidator<Partial<TModel>>
  onSubmit: (data: Partial<TModel>, e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

interface IState<TModel> extends Pick<IFormBase<TModel>, 'messageErrors'> {
  modelState?: Partial<TModel>
}

export interface IFormContextBase<TModel, S> {
  state?: S
  messageErrors: PartialError<TModel>
  onBlur: (keyName: keyof TModel) => void
  setError: (keyName: keyof TModel, message: string) => void
  setState<K extends keyof S>(state: ((prevState: Readonly<S>) => Pick<S, K> | S | null) | (Pick<S, K> | S | null), callback?: () => void): void
}

const CreateFormBase = function <TModel>(param?: IParam<TModel>) {
  const FormBaseContext = React.createContext<IFormContextBase<TModel, IState<TModel>>>({} as any)
  class FormBase extends Component<React.PropsWithChildren<IProps<TModel>>, IState<TModel>> {
    // Set default props
    static defaultProps: Partial<React.PropsWithChildren<IProps<TModel>>> = {
      innerRefForm: React.createRef<HTMLFormElement>()
    };
    constructor(props: IProps<TModel>) {
      super(props)
      this.validate = this.getValidate()
      this.state = { messageErrors: {} }
    }
    setError = (keyName: keyof TModel, message: string) => {
      const error = { [keyName]: [{ rule: SingleRuleValidate.Custom, message }] }
      this.setState({
        messageErrors: Object.assign({}, this.state.messageErrors, error)
      })
    }

    render() {
      const { onBlur, setState, setError } = this
      return (
        <>
          <Box component='form' sx={this.props.sx} ref={this.props.innerRefForm} onSubmit={this.onSubmit}>
            <FormBaseContext.Provider value={{ setError, onBlur, setState, state: this.state, messageErrors: this.state.messageErrors }}>
              {this.props.children}
            </FormBaseContext.Provider>
          </Box>
        </>

      )
    }

    private validate: FormValidator<Partial<TModel>>
    onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget as HTMLFormElement)
      const model = ConvertFormDataToJson<TModel>(formData)
      this.setState({ modelState: model })
      const messageErrors = this.validate.run(model) as PartialError<TModel>
      console.log({ messageErrors });

      if (messageErrors) {
        this.setState({ messageErrors: messageErrors })
        if (Object.keys(messageErrors).length > 0) return
      }
      await this.props.onSubmit(model, e).catch((error) => {
        const messageError = GetErrorFromResponse(error, model)
        this.setState({ messageErrors: { ...this.state.messageErrors, ...(messageError || {}) } })
      })
    }

    onBlur = (keyName: keyof TModel) => {
      if (!this.props.innerRefForm?.current) return
      const { messageErrors } = this.state
      const formData = new FormData(this.props.innerRefForm.current)
      const model = ConvertFormDataToJson(formData)
      this.setState({ modelState: model })
      const error = SingleValidate<TModel, Partial<TModel>>(keyName, model, messageErrors, this.validate) || {}
      this.setState({ messageErrors: error as PartialError<TModel> })
    }

    getValidate = (): FormValidator<Partial<TModel>> => {
      const defaultValidate = new FormValidator<Partial<TModel>>({})
      return ValidateMerge(defaultValidate, param?.validate, this.props.validate)
    }
  }

  return {
    Form: FormBase,
    Context: FormBaseContext,
    ContextMapping: (params: (context: IFormContextBase<TModel, IState<TModel>>) => JSX.Element) => (
      <FormBaseContext.Consumer>{params}</FormBaseContext.Consumer>
    ),
    ValueContext() {
      return {} as IFormContextBase<TModel, IState<TModel>>
    },
    Validator: param?.validate
  }
}
export default CreateFormBase
