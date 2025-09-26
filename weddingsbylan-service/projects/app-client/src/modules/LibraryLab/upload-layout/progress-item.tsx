import { Component } from 'react'
import { Close, Done } from '@mui/icons-material'
import { Box, Button, LinearProgress, Typography, IconButton, Tooltip } from '@mui/material'
import { getIcons } from './helper'
import { IProcessItem } from './types'

interface IProgressItemProps {
  item: IProcessItem
  itemHeight?: number
  onRetry: () => void
  onClose: () => void
  [key: string]: any
}

interface IProgressItemState {
  isHover: boolean
}

export default class ProgressItem extends Component<IProgressItemProps, IProgressItemState> {
  constructor(props: IProgressItemProps) {
    super(props)
    this.state = { isHover: false }
  }

  shouldComponentUpdate(nextProps: Readonly<IProgressItemProps>, nextState: Readonly<IProgressItemState>, nextContext: any): boolean {
    return Object.keys(nextProps).some((key) => (nextProps as any)[key] !== (this.props as any)[key]) || nextState.isHover !== this.state.isHover
  }

  onRetry = () => {
    this.props.onRetry()
  }

  getButton = (item: IProcessItem) => {
    return item.status === 'Completed' ? (
      <></>
    ) : (
      <IconButton sx={{ padding: 0 }} onClick={this.onClose}>
        <Close fontSize='small' />
      </IconButton>
    )
  }

  onClose = () => {
    this.setState({ isHover: true })
  }

  isShowHover = (item: IProcessItem) => {
    return item.status === 'Error' || this.state.isHover
  }

  onConfirm = () => {
    this.setState({ isHover: false })
    if (this.props.item.status === 'Completed') return
    this.props.onClose()
  }

  componentDidUpdate(prevProps: Readonly<IProgressItemProps>, prevState: Readonly<IProgressItemState>, snapshot?: any): void {
    if (this.state.isHover && this.props.item.status === 'Completed') {
      this.setState({ isHover: false })
    }
  }

  getContentHover = (item: IProcessItem) => {
    return this.state.isHover ? (
      <Box
        sx={{
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 1003,
          marginRight: '10px',
          padding: '0 10px',
          borderRadius: '15px'
        }}
      >
        <IconButton onClick={this.onConfirm} sx={{ background: '#e0e0e0', marginRight: '5px' }}>
          <Done color='action' fontSize='small' />
        </IconButton>
        <Typography color={'red'}>Are you sure delete!</Typography>
      </Box>
    ) : item.status === 'Error' ? (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          flex: 1
        }}
      >
        <Box sx={{ background: 'white' }}>
          <Button onClick={this.onRetry}>Retry</Button>
        </Box>
      </Box>
    ) : (
      <></>
    )
  }

  onHoverClose = () => {
    this.setState({ isHover: false })
  }

  render() {
    return (
      <Box sx={{ height: this.props.itemHeight, boxSizing: 'border-box', padding: '5px' }}>
        <Tooltip title={this.props.item.status === 'Error' ? this.props.item.message : ''} arrow>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              padding: '10px 5px',
              border: '1px solid #e0e0e0',
              borderRadius: '10px'
            }}
          >
            <Box sx={{ display: 'flex' }}>
              {getIcons(this.props.item.status)}
              <Box sx={{ flex: 1, overflow: 'hidden' }}>
                <Typography sx={{ textAlign: 'start' }} noWrap>
                  {this.props.item.name}
                </Typography>
              </Box>
              {this.getButton(this.props.item)}
            </Box>
            <LinearProgress
              sx={{ display: this.props.item.status === 'Processing' ? 'flex' : 'none' }}
              variant='determinate'
              value={this.props.item.value ?? 0}
            />
            <Box
              className='pannel-actions'
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                display: this.isShowHover(this.props.item) ? 'flex' : 'none',
                // justifyContent: 'end',
                alignItems: 'center'
              }}
            >
              {this.getContentHover(this.props.item)}
            </Box>
          </Box>
        </Tooltip>
        <Box
          onClick={this.onHoverClose}
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: this.state.isHover ? 'flex' : 'none',
            zIndex: 1002
          }}
        ></Box>
      </Box>
    )
  }
}
