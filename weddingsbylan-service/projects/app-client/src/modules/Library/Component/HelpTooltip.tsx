import React, { Component, PropsWithChildren } from 'react'
import { Box, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { SxProps, Theme, TooltipProps, TypographyProps, styled, tooltipClasses } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

interface IProps {
  title: string
  small?: boolean
  sxIcon?: SxProps<Theme>
}

export default class HelpTooltip extends Component<PropsWithChildren<IProps>> {
  render() {
    return (
      <HtmlTooltip
        placement='bottom'
        title={
          <Stack sx={{ gap: '6px', py: '6px', minWidth: '200px', maxWidth: '400px ' }}>
            <TooltipHeaderText>{this.props.title}</TooltipHeaderText>
            <Divider />
            <Box sx={{ p: '6px 12px' }}>{this.props.children}</Box>
          </Stack>
        }
      >
        <Box sx={{ cursor: 'default', ...this.props.sxIcon }}>
          <IconButton size='small'>
            <HelpOutlineIcon fontSize={this.props.small ? 'small' : 'medium'} sx={{ color: 'rgb(25,103,210)' }} />
          </IconButton>
        </Box>
      </HtmlTooltip>
    )
  }
}

const TooltipHeaderText = styled((props: TypographyProps) => <Typography variant='subtitle1' {...props} />)({
  color: '#0095ff',
  fontWeight: 700,
  padding: '0 10px'
})

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#fff',
      color: '#3c3c3c',
      maxWidth: 500,
      minHeight: 120,
      fontSize: theme.typography.pxToRem(12),
      borderRadius: '8px',
      boxShadow: 'rgba(0, 0, 0, 0.08) 0px 6px 30px'
    }
  })
)
