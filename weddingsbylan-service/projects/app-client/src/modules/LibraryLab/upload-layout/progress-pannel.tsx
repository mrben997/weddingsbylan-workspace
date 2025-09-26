import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { ProcessitemStatus } from './types'

const a11yProps = (index: number) => ({ id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` })

interface IProgressPannelProps {
  children: (status: ProcessitemStatus) => React.ReactNode
  renTabTitle?: (status: ProcessitemStatus) => React.ReactNode | string
  Pagination?: (status: ProcessitemStatus) => React.ReactNode
  onChangeTab?: (status: ProcessitemStatus) => void
}

const ProgressPannel: React.FC<IProgressPannelProps> = (props) => {
  const [value, setValue] = React.useState<ProcessitemStatus>('Processing')

  const handleChange = (event: React.SyntheticEvent, newValue: ProcessitemStatus) => {
    setValue(newValue)
    props.onChangeTab && props.onChangeTab(newValue)
  }

  const renTabTitle = props.renTabTitle ? props.renTabTitle : (status: ProcessitemStatus) => status

  const renderTabs = () => {
    return ['Processing', 'Pending', 'Completed', 'Error'].map((tab, idx) => {
      return <Tab label={renTabTitle(tab as ProcessitemStatus)} key={tab} value={tab} {...a11yProps(idx)} />
    })
  }

  return (
    <Box sx={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'sticky', top: 0, background: 'white', zIndex: 100 }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          {renderTabs()}
        </Tabs>
      </Box>
      <Box sx={{ flex: 1 }}>{props.children(value)}</Box>
      {props.Pagination && props.Pagination(value)}
    </Box>
  )
}
export default ProgressPannel
