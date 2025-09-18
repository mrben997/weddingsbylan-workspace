import React, { Component } from 'react'
import { Autocomplete, FilterOptionsState, TextField, TextFieldProps } from '@mui/material'
import { getErrorMessage } from '../../helper'
import { IFormInputBase } from '../../types'
import { ApiAlertContext } from '@/modules/Library/ApiContext'

export interface ISelectWithApiOption<TOther = any> {
  Id: string
  Name?: string
  Other?: TOther
}

interface IOptions {
  textFieldProps: TextFieldProps
}

interface IProps<TModel, TOption extends ISelectWithApiOption> extends IFormInputBase<TModel> {
  fetchData: (value?: string, signal?: AbortSignal) => Promise<TOption[]>
  onChange?: (value: TOption | null) => void
  existedIds?: string[]
  options?: IOptions
}

const CreateSelectWithApi = function <TModel, TOption extends ISelectWithApiOption = ISelectWithApiOption>() {
  interface IState {
    options: TOption[]
    statusText?: string
    optionSelected: TOption | null
    inputValue: string
    loading?: boolean
  }
  class SelectWithApi extends Component<IProps<TModel, TOption>, IState> {
    abortController = { signalController: new AbortController() }
    refInput: React.RefObject<HTMLInputElement>
    existedIds: string[] = []
    constructor(props: IProps<TModel, TOption>) {
      super(props)
      this.state = {
        options: [],
        statusText: 'no items',
        optionSelected: null,
        inputValue: '',
        loading: true
      }
      this.existedIds = props.existedIds ?? []
      this.refInput = React.createRef<HTMLInputElement>()
    }

    render() {
      const defaultValue = this.getDefaultValue()
      const eMessage = getErrorMessage(this.props.messageErrors, this.props.name)
      return (
        <>
          <Autocomplete
            disabled={this.state.loading || this.props.disabled}
            fullWidth
            noOptionsText={this.state.statusText}
            options={this.state.options}
            getOptionLabel={(x) => x.Name ?? x.Id}
            getOptionKey={(x) => JSON.stringify(x)}
            isOptionEqualToValue={(o, v) => o.Id.toString() === v.Id.toString() && o.Name === v.Name}
            filterOptions={this.fillterOptions}
            // select
            value={this.state.optionSelected}
            onChange={this.handleChange}
            // input
            inputValue={this.state.inputValue}
            onInputChange={this.handleInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label={this.getLabel()}
                error={eMessage.error}
                helperText={eMessage.message}
                onBlur={() => {
                  if (!this.props.name) return
                  this.props.onBlur && this.props.onBlur(this.props.name)
                }}
                {...this.props.options?.textFieldProps}
              />
            )}
          />
          <input ref={this.refInput} hidden name={this.props.name?.toString()} defaultValue={defaultValue} />
        </>
      )
    }

    componentDidMount() {
      this.fetchData()
    }

    componentWillUnmount(): void {
      this.timer.clear()
    }

    componentDidUpdate(prevProps: Readonly<IProps<TModel, TOption>>, prevState: Readonly<IState>, snapshot?: any): void {
      if (JSON.stringify(prevProps.existedIds) !== JSON.stringify(this.props.existedIds)) {
        this.existedIds = this.props.existedIds ?? []
      }
    }

    timer = {
      _timer: 0,
      _second: 500,
      callback: async (value: string) => {
        try {
          this.abortController.signalController = new AbortController()
          const res = await this.props.fetchData(value, this.abortController.signalController.signal)
          const options = OptionsFilter(res, this.existedIds)
          this.setState({ options })
        } catch (error) {
          // console.log(error)
          ApiAlertContext.ApiAlert?.PushError('Error from server!')
        } finally {
          this.setState({ statusText: 'no items' })
        }
      },
      start: (text: string) => {
        this.timer.clear()
        this.timer._timer = window.setTimeout(() => this.timer.callback(text), this.timer._second)
      },
      clear: () => {
        this.abortController.signalController.abort()
        clearTimeout(this.timer._timer)
      }
    }

    fetchData = async () => {
      try {
        const defaultValue = this.getDefaultValue()
        const res = await this.props.fetchData(defaultValue, this.abortController.signalController.signal)
        if (!Array.isArray(res)) return
        const options = OptionsFilter(res, this.existedIds)
        const optionSelected = options.find((x) => x.Id === defaultValue) ?? null
        this.setState({ options, optionSelected, loading: false })
        return
      } catch (error) {
        // console.log(error)
        ApiAlertContext.ApiAlert?.PushError('Error from server!')
      } finally {
        this.setState({ statusText: 'no items', loading: false })
      }
    }

    handleChange = (_: React.SyntheticEvent, value: TOption | null) => {
      this.setState({ optionSelected: value })
      if (this.refInput.current) this.refInput.current.value = value?.Id ?? ''
      this.props.onChange && this.props.onChange(value)
    }

    handleInputChange = (_: React.SyntheticEvent, value: string) => {
      const state: Pick<IState, 'inputValue' | 'statusText' | 'loading'> = { inputValue: value }
      if (value === this.state.optionSelected?.Name) {
        this.setState(state)
        return
      }
      const valueFormated = value.trim().toLowerCase()
      const selectedIndex = this.state.options.findIndex((x) => {
        return x.Name?.trim().toLowerCase().includes(valueFormated)
      })
      if (selectedIndex < 0 || valueFormated === '') state.statusText = 'loading...'
      this.setState(state, () => {
        if (selectedIndex < 0 || valueFormated === '') this.timer.start(valueFormated)
      })
    }

    fillterOptions = (options: TOption[], state: FilterOptionsState<TOption>) => {
      return options.filter((x) => {
        const value = state.inputValue.toLowerCase()
        return x.Id.toLowerCase().includes(value) || x.Name?.toLowerCase().includes(value)
      })
    }

    getLabel = () => {
      return this.props.label ?? this.props.name?.toString()
    }

    getDefaultValue = () => {
      if (!this.props.name) return
      return (this.props.defaultValue ?? this.props.data?.[this.props.name])?.toString()
    }
  }
  return SelectWithApi
}
export default CreateSelectWithApi
export type SelectWithApiType<TModel extends ISelectWithApiOption = ISelectWithApiOption> = ReturnType<typeof CreateSelectWithApi<TModel>>

function OptionsFilter<O extends ISelectWithApiOption = ISelectWithApiOption>(options: O[], existedId: string[] = []): O[] {
  const ids = new Set<string | number>(existedId)
  return options.reduce<O[]>((a, b) => {
    if (!ids.has(b.Id)) {
      a.push(b)
      ids.add(b.Id)
    }
    return a
  }, [])
}
