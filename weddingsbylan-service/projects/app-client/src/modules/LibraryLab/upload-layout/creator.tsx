import { createRef, PureComponent } from 'react'
import { Box, Button, styled, Typography } from '@mui/material'
import type { FC, MouseEventHandler } from 'react'
import { UploadLayoutContext } from './context'
import { UploadMonitor } from './upload-monitor'
import { IProcessItem, IUploadLayoutContext, IUploadLayoutProps, IUploadLayoutState, IBatchResult } from './types'
import UploadStatus from './upload-status'

export class UploadLayout extends PureComponent<IUploadLayoutProps, IUploadLayoutState> implements IUploadLayoutContext {
  constructor(props: IUploadLayoutProps) {
    super(props)
    this.state = { open: props.open, showComfirm: false }
    this._monitor = new UploadMonitor(3, this.executor, this.getItem)
    this._monitor.addEventListen('Error', this.uploadError)
    this._monitor.addEventListen('Completed', this.uploadComplete)
  }

  static defaultProps = {
    horizontal: 'end',
    vertical: 'end',
    contentHeight: 400,
    contentWidth: 400,
    itemHeight: 60,
    open: false
  }
  isUnmounted = false
  _monitor: UploadMonitor<IProcessItem>
  items: IProcessItem[] = []
  _batchCompleted = false // Track if batch callback already called
  componentWillUnmount(): void {
    this.isUnmounted = true
    clearTimeout(this._timeOut)
  }
  addItems = (items: Omit<IProcessItem, 'Value' | 'Signal'>[]) => {
    this.items.push(...items)
    this._batchCompleted = false // Reset batch completed flag for new batch
    this._monitor.start()
    this.forceUpdate()
  }
  setError = (id: number, message: string) => {
    const item = this.items.find((x) => x.id === id)
    if (item) {
      item.message = message
      item.handle?.forceUpdate()
    }
  }
  getItem = () => {
    const item = this.items.filter((x) => x.status === 'Pending')[0]
    if (item) item.status = 'Processing'
    return item
  }
  executor = async (item: IProcessItem) => {
    try {
      const result = await this.props.onUploadExecutor(item, (value) => {
        item.value = value
        this.updateItems(item)
      })
      item.status = 'Completed'
      item.uploadResult = result // Store the upload result

      // Call onItemComplete callback if provided
      if (this.props.onItemComplete) {
        this.props.onItemComplete(item)
      }
    } catch (error) {
      if (item.status !== 'Error') {
        item.status = 'Error'
        item.message = 'Upload failed'
      }
    }
    this.updateItems(item)
  }
  uploadComplete = (item: IProcessItem) => {
    item.status = 'Completed'
    this.updateItems(item)
  }
  uploadError: any = (data: [IProcessItem, Error]) => {
    data[0].status = 'Error'
    this.updateItems(data[0])
  }
  onItemClose = (item: IProcessItem) => {
    item.signalController?.abort()
    const index = this.items.findIndex((x) => x === item)
    if (index !== -1) {
      this.items.splice(index, 1)
      this.updateItems(item)
      this._monitor.start()
    }
  }
  onItemRetry = (item: IProcessItem) => {
    item.status = 'Pending'
    this.updateItems(item)
    this._monitor.start()
  }
  onRetryAll = () => {
    const items = this.items.filter((x) => x.status === 'Error')
    items.forEach((x) => (x.status = 'Pending'))
    this.updateItems(...items)
    this._monitor.start()
  }
  _timer = new Date()
  _isUploading = false
  _timeOut: NodeJS.Timeout | number = 0
  updateItems = (...items: IProcessItem[]) => {
    if (this._isUploading) return
    this._isUploading = true
    clearTimeout(this._timeOut)
    this._timeOut = setTimeout(() => {
      this._isUploading = false
      this.forceUpdate()
      // Check if all uploads completed and trigger batch callback
      this.checkAndTriggerBatchComplete()
    }, 500)
  }
  getErrors = () => this.items.filter((x) => x.status === 'Error')
  getComplete = () => this.items.filter((x) => x.status === 'Completed')
  isCompleted = () => {
    return !this.items.some((x) => x.status === 'Pending' || x.status === 'Processing')
  }
  createBatchResult = (): IBatchResult => {
    const completed = this.getComplete()
    const errors = this.getErrors()
    return {
      completed,
      errors,
      total: this.items.length,
      success: completed.length,
      failed: errors.length
    }
  }
  checkAndTriggerBatchComplete = () => {
    if (this.isCompleted() && !this._batchCompleted && this.items.length > 0) {
      this._batchCompleted = true
      if (this.props.onBatchComplete) {
        const results = this.createBatchResult()
        this.props.onBatchComplete(results)
      }
    }
  }
  close = () => {
    this.items.forEach((x) => x.signalController?.abort())
    this.items = []
    this.setState({ open: false, showComfirm: false }, () => {
      this.forceUpdate()
    })
  }
  CheckClose: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (!this.isCompleted()) {
      this.refUploadStatus.current?.UnCollapse()
      this.setState({ showComfirm: true })
      return
    }
    this.close()
  }
  show = () => {
    this.setState({ open: true })
  }
  closeComfirm = () => {
    this.setState({ showComfirm: false })
  }
  componentDidMount(): void {}
  refUploadStatus = createRef<UploadStatus>()
  render() {
    return (
      <UploadLayoutContext.Provider value={this}>
        {this.props.children}
        <UploadLayoutStyled
          className={uploadLayoutClasses.root}
          sx={{
            display: this.state.open ? 'flex' : 'none',
            justifyContent: this.props.horizontal,
            alignItems: this.props.vertical,
            width: this.props.contentWidth,
            top: this.props.vertical === 'start' ? 0 : undefined,
            bottom: this.props.vertical === 'end' ? 0 : undefined,
            left: this.props.horizontal === 'start' ? 0 : undefined,
            right: this.props.horizontal === 'end' ? 0 : undefined
          }}
        >
          {this.state.open ? (
            <div className={uploadLayoutClasses.formConfirm}>
              <UploadStatus
                ref={this.refUploadStatus}
                contentHeight={this.props.contentHeight}
                itemHeight={this.props.itemHeight}
                onUploadClose={this.CheckClose}
              />
              <Box className={uploadLayoutClasses.formConfirmPanel} sx={{ display: this.state.showComfirm ? 'flex' : 'none' }}>
                <div>
                  <Typography>There are files that have not been uploaded and they will not be uploaded!</Typography>
                  <Box>
                    <Button sx={{ marginRight: '10px' }} variant='contained' onClick={this.close}>
                      Yes
                    </Button>
                    <Button variant='outlined' onClick={this.closeComfirm}>
                      No
                    </Button>
                  </Box>
                </div>
              </Box>
            </div>
          ) : (
            <></>
          )}
        </UploadLayoutStyled>
      </UploadLayoutContext.Provider>
    )
  }
}
export default UploadLayout

export const createUploadLayout = (params: Partial<IUploadLayoutProps>) => {
  const _UploadLayout: FC<IUploadLayoutProps> = (props) => <UploadLayout {...params} {...props} />
  return _UploadLayout
}

const uploadLayoutClasses = {
  root: 'UploadLayout-root',
  formConfirm: 'UploadLayout-formConfirm',
  formConfirmPanel: 'UploadLayout-formConfirmPanel'
}

const getUploadLayoutClasses = (key: keyof typeof uploadLayoutClasses, options?: { prefix?: string; suffix?: string }) => {
  return `${options?.prefix || ''}.${uploadLayoutClasses[key]}${options?.suffix || ''}`
}

const UploadLayoutStyled = styled(Box)(({ theme }) => ({
  [getUploadLayoutClasses('root', { suffix: '&' })]: {
    position: 'fixed',
    zIndex: theme.zIndex.modal + 1 //1000,
  },
  [getUploadLayoutClasses('formConfirm')]: {
    width: '100%',
    height: '100%',
    display: 'flex'
  },
  [getUploadLayoutClasses('formConfirmPanel')]: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: '#00000045',
    borderRadius: '5px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    '& > div': {
      display: 'flex',
      background: 'white',
      borderRadius: '10px',
      padding: '10px',
      flexDirection: 'column'
    }
  }
}))
