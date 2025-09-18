import { getLocale } from '@/admin-react-app/ultilities/helper'
import { QueryParam } from '@/modules/Library/Helpers'
import { IModalRouteAbstract } from '@/modules/Library/Layout/ModalRoute/CreatetModalRoute'
import { AddBoxRounded } from '@mui/icons-material'
import { alpha, Box, CircularProgress, Fade, SxProps, TextField, Theme, Typography } from '@mui/material'
import React, { Component, MouseEventHandler, PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
interface ILayoutContainerProps<T> {
    Title?: string
    sx?: SxProps<Theme>
    ContentMap?: Record<keyof T | string, JSX.Element>
    getContentKey?: () => string | undefined
    onClose?: () => void
    isLoading: boolean
}
interface ILayoutContainerState {
}
interface IQueryParam {
    or: string
}

const RouteChangeLogger: React.FC<IModalRouteAbstract> = ({ refresh }) => {
    const location = useLocation()
    React.useEffect(() => {
        refresh()
    }, [location, location.search, refresh])
    return <></>
}

export default class LayoutContainer<T = any> extends Component<PropsWithChildren<ILayoutContainerProps<T>>, ILayoutContainerState> {
    refresh = () => {
        this.forceUpdate()
    }
    constructor(props: ILayoutContainerProps<T>) {
        super(props)
        this.state = {
        }
    }


    getContent = () => {
        if (!this.props.ContentMap || !this.props.getContentKey) {
            return <>NONE</>
        }
        return this.props.isLoading ? <Box sx={{ display: 'flex', flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </Box> : this.props.ContentMap[(this.props.getContentKey() ?? '') as string] ?? <></>
    }
    renderRightModal = () => {
        return <Fade in>
            <Box sx={{
                position: 'absolute', zIndex: 2000,
                background: alpha('#000', 0.2),
                top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <Box component={Link} sx={{ flex: 1 }} to={`?locale=${getLocale()}#`} ></Box>
                <Box sx={{ width: '60vw', background: 'white', height: '100vh', overflow: 'auto', position: 'relative' }}>
                    {this.getContent()}
                </Box>
            </Box>
        </Fade>
    }
    preventBack: MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }
    prevOr: any = ''
    componentDidUpdate(prevProps: Readonly<React.PropsWithChildren<ILayoutContainerProps<T>>>, prevState: Readonly<ILayoutContainerState>, snapshot?: any): void {
        const orParam = QueryParam.Gets<IQueryParam>('or')
        if (orParam.or != this.prevOr && !orParam.or) {
            this.props.onClose && this.props.onClose()
        }
        this.prevOr = orParam.or
    }
    render() {
        const orParam = QueryParam.Gets<IQueryParam>('or')
        return (<Box sx={{ flexDirection: 'column', display: 'flex', flex: 1, ...(this.props.sx ?? {}) }}>
            {this.props.children}
            {orParam.or && ReactDOM.createPortal(this.renderRightModal(), document.body)}
            <RouteChangeLogger refresh={this.refresh} />
        </Box>
        )
    }
}
