import React, { Component } from 'react'
import { Collapse, FormControl, FormHelperText, InputLabel, MenuItem, Select, } from '@mui/material'
import { IFormInputBase } from '../../types'
import { getErrorMessage, MergeObjects } from '../../helper'
import TextCkEditor, { ITextCkEditorProps } from './CkEditor'


interface ISlots {
    InnerProps?: ITextCkEditorProps
}

interface IOptions extends ISlots { }

const CreateTextCkEditor = function <TModel = any>(options?: IOptions) {
    interface IProps extends Partial<IFormInputBase<TModel>> {
        onChange?: (value: any) => void
        slots?: ISlots
    }
    interface IState {
        value?: string
    }
    class SelectSimple extends Component<IProps, IState> {
        constructor(props: IProps) {
            super(props)
            this.state = { value: this.getDefaultValue()?.toString() }
        }
        mapProps = (): ITextCkEditorProps => {
            const label = this.getLabel()
            const tfp: ITextCkEditorProps = {
                name: this.props.name?.toString(),
                // onChange: (event) => {
                //     const value: string = event.target.value + ''
                //     this.setState({ value }, () => {
                //         if (!!this.props.name) {
                //             this.props.onBlur && this.props.onBlur(this.props.name)
                //         }
                //         const temp = this.props.options.find((x) => x.value?.toString() === value)
                //         if (!temp) return
                //         this.props.onChange && this.props.onChange(temp)
                //     })
                // },
                // disabled: this.props.disabled,
                // fullWidth: true
                defaultValue: this.getDefaultValue(),
                ...(options?.InnerProps ?? {})
            }
            const selectProps = this.props.slots?.InnerProps ?? options?.InnerProps
            return MergeObjects({}, tfp, selectProps)
        }
        render() {
            const label = this.getLabel()
            const errorMessage = getErrorMessage(this.props.messageErrors, this.props.name)
            return (
                <React.Fragment>
                    {/* {!!this.props.disabled && <input hidden name={this.props.name?.toString()} defaultValue={this.getDefaultValue()} />} */}
                    <InputLabel sx={{ marginBottom: '-15px', color: 'black' }} id={this.props.name?.toString() + label}>{label}</InputLabel>
                    <FormControl fullWidth disabled={this.props.disabled} error={errorMessage.error}>
                        <TextCkEditor {...this.mapProps()}>
                        </TextCkEditor>
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
        getDefaultValue = () => {
            const { data, name } = this.props
            return this.props.defaultValue?.toString() ?? (!!data && !!name ? data[name] : undefined)
        }
    }
    return SelectSimple
}
export default CreateTextCkEditor
export type SelectSimpleType<TModel> = ReturnType<typeof CreateTextCkEditor<TModel>>
