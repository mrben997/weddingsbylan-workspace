import { alpha, Box, Typography } from '@mui/material'
import React, { Component, MouseEventHandler, PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
interface ILayoutBlockProps {
    Title?: string
}
interface ILayoutBlockState {
}
export default class LayoutBlock extends Component<PropsWithChildren<ILayoutBlockProps>, ILayoutBlockState> {
    constructor(props: ILayoutBlockProps) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <Box sx={{ display: 'flex', flex: 1, minHeight: '500px', background: 'red' }}>
                <Typography>{this.props.Title}</Typography>
                <Link to={'?or=open'} >Open</Link>
                <Link to={'#'} >Close</Link>
                <Box>
                    {this.props.children}
                </Box>
            </Box>
        )
    }
}
