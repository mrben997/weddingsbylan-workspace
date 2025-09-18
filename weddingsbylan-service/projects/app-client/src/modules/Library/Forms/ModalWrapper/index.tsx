import React, { Component } from 'react'
import { Box, Breakpoint, IconButton, Paper, styled, SxProps, Theme, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { MapGlobalModalContext } from '../../ApiContext'

interface IProps {
  title: string
  size?: Breakpoint
  slots?: {
    sxTopbarProps?: SxProps<Theme>
    beforeTitle?: JSX.Element
  }
}
class FormModalWrapper extends Component<React.PropsWithChildren<IProps>> {
  render() {
    return MapGlobalModalContext((context) => {
      return (
        <Wrap size={this.props.size}>
          <TopBar sx={this.props.slots?.sxTopbarProps}>
            {this.props.slots?.beforeTitle && (
              <>
                {this.props.slots.beforeTitle}
                <Box flex={1} />
              </>
            )}
            <Typography component='h3' variant='subtitle1' sx={{ mt: '2px', ml: '8px', fontWeight: 700 }}>
              {this.props.title}
            </Typography>
            <Box flex={1} />
            <BtnClose onClick={context.CloseModal}>
              <CloseIcon />
            </BtnClose>
          </TopBar>
          {this.props.children}
        </Wrap>
      )
    })
  }
}
export default FormModalWrapper

const Wrap = styled(Paper)<{ size?: Breakpoint }>(({ theme, size }) => ({
  maxHeight: 'calc(100vh - 24px)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  width: theme.breakpoints.values[size ?? 'lg'],
  [theme.breakpoints.down('sm')]: { width: 'calc(100vw - 24px)' }
}))

const BtnClose = styled(IconButton)({
  flex: '0 0 auto',
  color: '#3c3c3c',
  '& svg': { transition: 'all 0.2s' },
  '&:hover svg': { color: '#ff200c' }
})

const TopBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '0 8px 0 8px',
  gap: '6px',
  flex: '0 0 auto',
  boxShadow: 'rgba(145, 158, 171, 0.1) 0px 0px 2px 0px,rgba(145, 158, 171, 0.12) 0px 0px 24px -4px',
  height: '48px'
})
