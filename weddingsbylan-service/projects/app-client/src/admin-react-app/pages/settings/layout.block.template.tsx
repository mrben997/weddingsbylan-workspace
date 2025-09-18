import { alpha, Box, Button, IconButton, LinearProgress, Paper, Typography } from "@mui/material";
import React, { Component, ReactNode } from "react";
import LayoutBlockItem, { ISubmitor, TLayoutItemForm } from "./layout.block.item";
import { IFormModel, IFormTemplateBase, TColor, TRenderFormAction } from "./types";
import { DictToList, DictToListNotNull, getLocale } from "@/admin-react-app/ultilities/helper";
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
interface ILayoutBlockTemplateProps<T extends IFormModel> extends IFormTemplateBase {
    data: Partial<T> | Partial<T>[]
    title: string
    extractKey: (data: Partial<T>) => string
    renderConfig: TRenderFormAction<T>
    isSingleSubmit?: boolean
    onSubmit?: (x: Partial<T>) => Promise<void>
    onSubmitAll?: (x: Partial<T>[]) => Promise<void>
    isSingle?: boolean
    isError?: boolean
    extractData?: any
}
interface ILayoutBlockTemplateState<T> {
    data: Record<string, Partial<T>>
    isLoading: boolean
}

export class LayoutBlockTemplate<T extends IFormModel = IFormModel> extends Component<ILayoutBlockTemplateProps<T>, ILayoutBlockTemplateState<T>> {
    constructor(props: ILayoutBlockTemplateProps<T>) {
        super(props)
        this.state = {
            data: this.innitialData(),
            isLoading: false
        }
    }
    innitialData = () => {
        const temp = this.props.data ?? []
        const data = Array.isArray(temp) ? temp : [temp]
        if (this.props.isSingle && data.length < 1) {
            data.push(this.createItem())
        }
        return data.reduce((a, b) => {
            a[b.Id?.toString() ?? ""] = b
            return a
        }, {} as Record<string, Partial<T>>)
    }
  
    mapSubmitor: Record<string, ISubmitor<T> & { resolve?: (value: Partial<T>) => void }> = {}
    onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        if (this.props.isSingleSubmit !== true) {
            const tasks: Promise<Partial<T>>[] = []
            for (const key in this.mapSubmitor) {
                if (Object.prototype.hasOwnProperty.call(this.mapSubmitor, key)) {
                    const element = this.mapSubmitor[key];
                    if (element.refForm.current) {
                        const promise = new Promise<Partial<T>>((res, rej) => {
                            element.resolve = res
                        })
                        tasks.push(promise)
                        element.refForm.current.requestSubmit()
                    }
                }
            }
            try {
                this.setState({ isLoading: true })
                if (this.props.onSubmitAll) {
                    const data = await Promise.all(tasks)
                    await this.props.onSubmitAll(data)
                }
            } catch (error) {

            } finally {
                this.setState({ isLoading: false })
            }

        }
    }

    createSubmitor = (x: Partial<T>) => {
        const submitor = {
            onSubmit: async (value: Partial<T>) => {
                value.Id = x.Id//when submitting the form there will be no id => attach id
                if (this.props.isSingleSubmit === true) {
                    this.props.onSubmit && this.props.onSubmit(value)
                } else {
                    const resolve = this.mapSubmitor[this.props.extractKey(x)]?.resolve
                    resolve && resolve(value)
                }
            },
            refForm: React.createRef<HTMLFormElement>()
        }
        this.mapSubmitor[this.props.extractKey(x)] = submitor
        return submitor
    }
    renderArray = (data: Partial<T>[]) => {
        return data.map((x, i) => {
            let submitor = this.mapSubmitor[this.props.extractKey(x)]
            if (!submitor) {
                submitor = this.createSubmitor(x)
            }
            return <LayoutBlockItem
                Area={this.props.Area}
                data={x}
                FormKey={this.props.FormKey}
                Submitor={submitor}
                isSubmit={this.props.isSingleSubmit ?? false}
                title={"Item " + (i + 1)}
                key={this.props.extractKey ? this.props.extractKey(x) : 'key' + i}
                Config={this.props.renderConfig(x)}
                onRemove={this.props.isSingle ? undefined : this.onDelete}
            />
        })
    }
    createItem = (): Partial<T> => {
        return {
            Area: this.props.Area,
            FormKey: this.props.FormKey,
            IsNew: true,
            Id: new Date().getTime(),
        } as Partial<T>
    }
    onCreate = () => {
        const item = this.createItem()
        const data = Object.assign({}, this.state.data, { [item.Id?.toString() ?? ""]: item })
        this.setState({ data })
    }
    onDelete = (data?: Partial<T>) => {
        if (data?.Id) {
            const dataState = Object.assign({}, this.state.data)
            delete dataState[data.Id.toString()]
            this.setState({ data: dataState })
        }
    }
    getData = () => {
        return DictToListNotNull(this.state.data) as Partial<T>[]
    }
    isButtonDisable = () => {
        return this.props.isError === true || this.state.isLoading
    }
    buttonColor = (color: TColor): TColor => {
        return this.isButtonDisable() ? "disabled" : color
    }
    render() {
        return <Box sx={{  }}>
            <Box sx={{ position: 'absolute', width: '100%', zIndex: 100, padding: '1px 2px' }}>
                {this.state.isLoading ? <LinearProgress /> : <></>}
            </Box>
            <Paper sx={{
                display: 'flex', justifyContent: 'space-between',
                padding: '10px', alignItems: 'center', position: 'sticky',
                top: 0,
                background: 'white',
                zIndex: 10,
                height: '60px'
            }}>
                <Typography sx={{ margin: '5px' }} variant="subtitle1">
                    <BookmarkIcon color="info" />
                    {this.props.title}
                </Typography>
                <Box sx={{ display: 'flex' }}>
                    {
                        this.props.isSingle === true ? <></> :
                            <IconButton onClick={this.onCreate} disabled={this.isButtonDisable()}>
                                <AddIcon color={this.buttonColor('success')} />
                            </IconButton>
                    }
                    {
                        this.props.isSingleSubmit !== true ?
                            <IconButton onClick={this.onSubmit} disabled={this.isButtonDisable()}>
                                <SaveIcon color={this.buttonColor('primary')} />
                            </IconButton>
                            : <></>
                    }
                    <IconButton component={Link} to={`?locale=${getLocale()}#`}>
                        <CloseIcon color="error" />
                    </IconButton>

                </Box>
            </Paper>
            <Box sx={{
                display: 'flex', flex: 1,
                height: 'calc(100vh - 60px)', flexDirection: 'column',
                ...(this.state.isLoading ? { overflow: 'hidden' } : {})

            }}>
                {this.props.isError === true ?//has error
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Typography variant="caption" color="error">An error occurred</Typography>
                    </Box>
                    : this.getData().length ? //has data
                        this.renderArray(this.getData())
                        : //no data
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <Typography variant="caption">No items</Typography>
                        </Box>}
                <Box sx={{
                    display: this.state.isLoading ? 'block' : 'none',
                    position: 'absolute', top: 0, left: 0, right: 0,
                    height: "100%", background: alpha("#000", 0.2)
                }}></Box>
            </Box>
        </Box>
    }
}