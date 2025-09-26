import React, { Component } from 'react'
import { Close, ExpandMore } from '@mui/icons-material'
import { Box, Card, CardHeader, Typography, IconButton, Accordion, styled, Button, TablePagination } from '@mui/material'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import ProgressItem from './progress-item'
import ProgressPannel from './progress-pannel'
import { getIcons } from './helper'
import { UploadLayoutContext } from './context'
import { IUploadLayoutContext, ProcessitemStatus } from './types'

interface IUploadStatusProps {
  onUploadClose: React.MouseEventHandler<HTMLButtonElement>
  contentHeight?: number
  itemHeight?: number
}

interface IUploadStatusState {
  expand: boolean
  page: Record<ProcessitemStatus, number | undefined>
}

export default class UploadStatus extends Component<IUploadStatusProps, IUploadStatusState> {
  constructor(props: IUploadStatusProps) {
    super(props)
    this.state = {
      expand: true,
      page: {} as Record<ProcessitemStatus, number | undefined>
    }
  }

  isUnmounted = false
  componentWillUnmount(): void {
    this.isUnmounted = true
  }
  UnCollapse = () => {
    this.setState({ expand: true })
  }
  expanChange = () => {
    this.setState({ expand: !this.state.expand })
  }

  handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number, status: ProcessitemStatus) => {
    this.setPage(status, page)
  }
  setPage = (status: ProcessitemStatus, page: number) => {
    this.setState({ page: { ...this.state.page, [status]: page } })
  }
  rowsPerPage = 50
  gernerateItems = (context: IUploadLayoutContext, status: ProcessitemStatus) => {
    const data = context.items.filter((x) => x.status === status)
    const page = this.state.page[status] ?? 0
    return data.slice(page * this.rowsPerPage, (page + 1) * this.rowsPerPage).map((item) => {
      return (
        <ProgressItem
          itemHeight={this.props.itemHeight}
          key={'key' + item.id}
          ref={(ref) => {
            item.handle = ref
          }}
          item={item}
          {...item}
          onClose={() => context.onItemClose(item)}
          onRetry={() => context.onItemRetry(item)}
        />
      )
    })
  }

  componentDidMount(): void {}

  getErrorTitle = (context: IUploadLayoutContext) => {
    const errors = context.getErrors().length
    const onRetryAll: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      e.preventDefault()
      e.stopPropagation()
      context.onRetryAll()
    }
    return errors ? (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button onClick={onRetryAll}>Retry all</Button>
        <Typography variant='subtitle2'>{context.getErrors().length} error(s)</Typography>
      </Box>
    ) : (
      <></>
    )
  }

  render() {
    return (
      <UploadLayoutContext.Consumer>
        {(context) => (
          <Card sx={{ flex: 1, background: 'white', margin: '10px', border: '1px solid #e0e0e0' }}>
            <Accordion expanded={this.state.expand} onChange={this.expanChange} sx={{ padding: 0 }}>
              <AccordionSummary expandIcon={<ExpandMore />} sx={{ display: 'flex' }}>
                <CardHeader
                  action={
                    <IconButton aria-label='settings' onClick={this.props.onUploadClose} sx={{ padding: 0 }}>
                      <Close />
                    </IconButton>
                  }
                  title={
                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                      Upload list ({context.getComplete().length + context.getErrors().length}/{context.items.length})
                    </Typography>
                  }
                  subheader={this.getErrorTitle(context)}
                  sx={{ padding: '5px', flex: 1, '& .MuiCardHeader-action': { margin: 0 } }}
                />
              </AccordionSummary>
              <AccordionDetails sx={{ height: this.props.contentHeight, padding: '0', boxSizing: 'border-box', display: 'flex' }}>
                {/* {this.gernerateItems(context)} */}
                <ProgressPannel
                  renTabTitle={(status) => {
                    return (
                      <Box>
                        <Typography variant='body2' sx={{ textTransform: 'none' }}>
                          {status}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {getIcons(status, { fontSize: '13px' })}
                          <Typography variant='subtitle2' sx={{ fontSize: '9px' }}>
                            {context.items.filter((x) => x.status === status).length}
                          </Typography>
                        </Box>
                      </Box>
                    )
                  }}
                  onChangeTab={(status) => this.setPage(status, 0)}
                  Pagination={(status) => {
                    const data = context.items.filter((x) => x.status === status)
                    return (
                      <TablePagination
                        component='div'
                        sx={{ position: 'sticky', bottom: 0, flex: '0 0 auto', background: 'white', zIndex: 100 }}
                        count={data.length}
                        page={this.state.page[status] ?? 0}
                        rowsPerPageOptions={[]}
                        rowsPerPage={this.rowsPerPage}
                        onPageChange={(e, p) => this.handleChangePage(e, p, status)}
                      />
                    )
                  }}
                >
                  {(status) => this.gernerateItems(context, status)}
                </ProgressPannel>
              </AccordionDetails>
            </Accordion>
          </Card>
        )}
      </UploadLayoutContext.Consumer>
    )
  }
}
const AccordionSummary = styled((props: AccordionSummaryProps) => <MuiAccordionSummary expandIcon={<ExpandMore sx={{ fontSize: '0.9rem' }} />} {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    padding: ' 0 5px',
    // '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    //   // transform: 'rotate(90deg)',
    // },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      // transform: 'rotate(90deg)',
      margin: 0
    },
    '& .MuiAccordionSummary-content': {
      margin: 0,
      display: 'flex',
      marginLeft: theme.spacing(1)
    }
  })
)

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}))
