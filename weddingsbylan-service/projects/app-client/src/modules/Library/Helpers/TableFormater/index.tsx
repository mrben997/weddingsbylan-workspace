import { Tooltip, TooltipProps, Typography } from '@mui/material'
import dayjs from 'dayjs'

export class TableFormater {
  static formatSize = (size: number): string => {
    if (typeof size !== 'number' || Number.isNaN(size) === true) {
      return 'unknown size'
    }

    if (size <= 0) {
      return '0 bytes'
    }

    const abbreviations = ['bytes', 'KiB', 'MiB', 'GiB']
    const index = Math.floor(Math.log(size) / Math.log(1024))

    return `${+(size / Math.pow(1024, index)).toPrecision(3)} ${abbreviations[index]}`
  }

  static formatDuration = (duration: number): string => {
    if (typeof duration !== 'number' || Number.isNaN(duration) === true) {
      return '00:00:00'
    }

    // Round the duration to the nearest second
    const totalSeconds = Math.round(duration)

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    // Format each component to ensure it has two digits
    const hoursString = String(hours).padStart(2, '0')
    const minutesString = String(minutes).padStart(2, '0')
    const secondsString = String(seconds).padStart(2, '0')

    // Combine the components into a single string
    return `${hoursString}:${minutesString}:${secondsString}`
  }

  static formatDateString = 'DD/MM/YYYY HH:mm:ss'
  static formatDate = (dateString?: string, formatString?: string) => {
    return dateString ? dayjs(dateString).format(formatString ?? TableFormater.formatDateString) : ''
  }

  static tooltip = (value: string, tooltipProps?: Omit<TooltipProps, 'children'>) => {
    return (
      <Tooltip {...tooltipProps} title={tooltipProps ? tooltipProps.title : value}>
        <Typography variant='subtitle2'>{value}</Typography>
      </Tooltip>
    )
  }

  static tooltipDate = (dateString?: string) => {
    const { tooltip, formatDate, formatDateString } = TableFormater
    return tooltip(formatDate(dateString), { title: formatDateString })
  }

  static formatCurrency = (value?: any, prefix = '$ ', suffix = ''): string => {
    let parsedValue
    try {
      parsedValue = parseFloat(value)
      if (isNaN(parsedValue)) parsedValue = 0
    } catch (e) {
      parsedValue = 0
    }
    const roundedValue = parsedValue.toFixed(2)
    const [integerPart, decimalPart] = roundedValue.split('.')
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

    let formattedValue = formattedIntegerPart
    if (decimalPart !== '00') {
      formattedValue = `${formattedIntegerPart}.${decimalPart}`
    }
    return `${prefix}${formattedValue}${suffix}`
  }
}
export default TableFormater
