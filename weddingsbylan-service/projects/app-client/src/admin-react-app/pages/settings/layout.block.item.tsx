import { CreateFormGridLayout, FormValidator, IFormGridLayoutConfig } from '@/modules/Library/Forms'
import { Box, IconButton, Typography } from '@mui/material'
import React, { Component } from 'react'
import { IFormModel, IFormTemplateBase } from './types'
import CloseIcon from '@mui/icons-material/Close';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FiberNewIcon from '@mui/icons-material/FiberNew';
type ILayoutBlockItemModel<T = any> = T & {

}
const formValidate = new FormValidator<Partial<ILayoutBlockItemModel>>({

})
export interface ISubmitor<T> {
    onSubmit: (value: Partial<T>) => Promise<void>
    refForm: React.RefObject<HTMLFormElement>
}
export type TLayoutItemForm<T = any> = IFormGridLayoutConfig<T>
interface ILayoutBlockItemProps<T> extends IFormTemplateBase {
    Submitor: ISubmitor<T>
    Config: TLayoutItemForm<any>[]
    title?: string
    isSubmit?: boolean
    data?: Partial<T>
    onRemove?: (data?: Partial<T>) => void
}
export default class LayoutBlockItem<T extends IFormModel = IFormModel> extends Component<ILayoutBlockItemProps<T>> {
    /**
     *
     */
    constructor(props: ILayoutBlockItemProps<T>) {
        super(props);
        this.FormInstance = CreateFormGridLayout({
            validate: formValidate,
            configs: this.props.Config,
        })
    }

    FormInstance: ReturnType<typeof CreateFormGridLayout<ILayoutBlockItemModel>>
    onRemove = () => {
        this.props.onRemove && this.props.onRemove(this.props.data)
    }
    render() {
        const { FormInstance } = this
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='subtitle2' sx={{ display: 'flex' }} >
                        <AcUnitIcon sx={{ fontSize: '1rem' }} color='warning' />
                        {this.props.title}
                        {this.props.data?.IsNew ?
                            <FiberNewIcon color='success' /> : <></>}
                    </Typography>
                    {this.props.onRemove ? <IconButton onClick={this.onRemove}>
                        <CloseIcon />
                    </IconButton> : <></>}
                </Box>
                <FormInstance
                    data={this.props.data}
                    slots={{
                        sx: {
                            maxHeight: 'initial'
                        }
                    }}
                    InputHiddens={
                        <>
                            <input name='Area' value={this.props.Area} hidden />
                            <input name='FormKey' value={this.props.FormKey} hidden />
                            <input name='IsNew' value={this.props.data?.IsNew ? "true" : "false"} hidden />
                        </>
                    }
                    innerRefForm={this.props.Submitor.refForm} isSubmit={this.props.isSubmit} onSubmit={this.props.Submitor.onSubmit}
                />
            </Box>
        )
    }
}
