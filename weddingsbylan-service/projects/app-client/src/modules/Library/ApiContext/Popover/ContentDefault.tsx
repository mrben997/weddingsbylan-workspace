import { Box, Typography } from '@mui/material'
import React, { Component } from 'react'

export default class ContentDefault extends Component {
  render() {
    return (
      <Box sx={{ p: '9px 12px', m: '12px', backgroundColor: 'rgba(0,0,0,0.1)' }}>
        <Typography variant='caption' sx={{ fontWeight: 600, fontStyle: 'italic' }}>
          Content
        </Typography>
      </Box>
    )
  }
}
