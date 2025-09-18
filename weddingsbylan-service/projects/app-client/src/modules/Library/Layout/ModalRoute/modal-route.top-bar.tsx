import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Box, styled, Typography, TypographyProps } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

export interface ITopBarProps {
  components?: {
    right?: JSX.Element
    rightable?: boolean
  }
}

interface IProps extends ITopBarProps {
  to: string
  title?: string | JSX.Element
  btnBackTitle?: string
}

class MRTopBar extends Component<IProps> {
  render() {
    return (
      <Wrap>
        <ButtonBack to={this.props.to} onClick={this.onBackClick}>
          <ArrowBackIosNewIcon fontSize='small' sx={{ width: '0.9em', height: '0.9em' }} />
          <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
            {this.props.btnBackTitle ?? 'back'}
          </Typography>
          <TextEsc>Esc</TextEsc>
        </ButtonBack>
        {this.renderTitle()}
        {this.props.components?.rightable !== true && <Box sx={{ minWidth: '175px', flex: '0 0 auto' }}>{this.props.components?.right}</Box>}
      </Wrap>
    )
  }
  renderTitle = () => {
    if (typeof this.props.title === 'string') {
      return (
        <Typography component='h6' variant='subtitle1' sx={{ fontWeight: 600, color: '#606060' }}>
          {this.props.title}
        </Typography>
      )
    }
    return this.props.title
  }
  onBackClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!this.props.to) {
      e.preventDefault()
      e.stopPropagation()
      window.history.back()
    }
  }
}
export default MRTopBar

const Wrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 0',
  margin: '-10px -10px 0',
  backgroundColor: '#fff',
  // boxShadow: theme.app.boxShadow[1],
  position: 'relative',
  zIndex: 5
}))

const ButtonBack = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  textTransform: 'none',
  textDecoration: 'none!important',
  width: '175px',
  flex: '0 0 auto',
  padding: '0 18px',
  color: '#818181',
  transition: 'linear 0.2s',
  '&:hover': { color: '#006bd6' },
  '&:hover span.MuiTypography-caption': { borderColor: '#006bd6' }
})

const TextEsc = styled(({ children, ...p }: TypographyProps) => (
  <Typography component='span' variant='caption' {...p}>
    {children}
  </Typography>
))({
  fontFamily: `'Exo 2', sans-serif`,
  transition: 'linear 0.2s',
  display: 'inline-block',
  border: '1px solid #818181',
  borderRadius: '5px',
  padding: '0 2px',
  fontSize: '0.6rem',
  lineHeight: 1.5,
  fontWeight: 600,
  marginTop: '3px',
  marginLeft: '3px'
})
