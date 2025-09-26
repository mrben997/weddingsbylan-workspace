import { ArrowCircleUp, Done, Info, Pending } from "@mui/icons-material"
import { ProcessitemStatus } from "./types"
import { SxProps } from "@mui/material"

export const getIcons = (Status: ProcessitemStatus, sx?: SxProps<any>) => {
  switch (Status) {
    case 'Completed':
      return <Done sx={sx} color='success' fontSize='small' />
    case 'Error':
      return <Info sx={sx} color='error' fontSize='small' />
    case 'Processing':
      return <ArrowCircleUp sx={sx} color='info' fontSize='small' />
    default:
      return <Pending sx={sx} color='info' fontSize='small' />
  }
}