import React, { Component } from 'react'
import { CircularProgress, Divider, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import ReplayIcon from '@mui/icons-material/Replay'
import SquareIcon from '@mui/icons-material/Square'
import RemoveIcon from '@mui/icons-material/Remove'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { attachModalClasses, AttachModalStyled } from './styled'
import { getAttachQuality, isValidFileType, mapItemConfigs } from './helpers'
import { allowFileTypes, checkEqualQuality, fileToAttachItem } from './helpers'
import type { AttachChangeFunction, IAttachItem, IAttachItemConfig, IAttachItemStatus } from './types'

interface IAttachModalProps {
  value: IAttachItem[]
  onChange?: AttachChangeFunction
  /** @default true */
  isAutoClose?: boolean
  onClose?: () => void
}

interface IAttachModalState {
  attachs: IAttachItem[]
  isDragging: boolean
  isLoading: boolean
}

class AttachModal extends Component<IAttachModalProps, IAttachModalState> {
  constructor(props: IAttachModalProps) {
    super(props)
    this.state = { attachs: [...props.value], isDragging: false, isLoading: false }
  }

  get attachItems() {
    return this.state.attachs
  }

  get attachItemConfigs(): IAttachItemConfig[] {
    const temp = getAttachQuality(this.attachItems)
    const list = Object.keys(mapItemConfigs) as IAttachItemStatus[]
    return list.map((key) => {
      const config = { ...mapItemConfigs[key] }
      config.count = temp[key]
      return config
    })
  }

  // shouldComponentUpdate(nextProps: Readonly<IAttachModalProps>): boolean {
  //   if (nextProps.value !== this.props.value) {
  //     this.setState({ attachs: [...nextProps.value] })
  //     return false
  //   }
  //   return true
  // }

  render() {
    const { isDragging } = this.state
    const isSave = checkEqualQuality(this.attachItems, this.props.value)
    const rootClasses = [attachModalClasses.root]
    if (isDragging && !this.state.isLoading) rootClasses.push(attachModalClasses.dragging)
    if (this.state.isLoading) rootClasses.push(attachModalClasses.loading)

    return (
      <AttachModalStyled
        className={rootClasses.join(' ')}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <div className={attachModalClasses.header}>
          <div>
            <Typography variant='h6' noWrap>
              Attach File
            </Typography>
            <Typography variant='body2' noWrap color='text.secondary'>
              Data will only be updated after you click the Save button
            </Typography>
          </div>
          <Stack direction='row' spacing={1}>
            <input ref={this.fileInputRef} type='file' hidden multiple onChange={this.handleFileChange} accept={allowFileTypes.join(',')} />
            <Tooltip title='Add files' arrow>
              <IconButton color='primary' onClick={this.handleIconClick}>
                <AttachFileIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={isSave ? 'Save' : 'Unsaved changes'} arrow>
              <span>
                <IconButton color='primary' onClick={this.onSaveHandler} disabled={!isSave}>
                  <SaveIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title='Close' arrow>
              <IconButton color='error' onClick={this.props.onClose}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </div>
        <Divider />
        <div className={attachModalClasses.content}>
          {this.attachItems.length < 1 && (
            <Stack className={attachModalClasses.emptyState}>
              <Typography variant='body2' color='text.secondary'>
                Drag and drop files here or click to browse
              </Typography>
            </Stack>
          )}
          <Grid container spacing={1.5}>
            {this.attachItems.map((x, i) => {
              const itemClasses = [attachModalClasses.item]

              if (x.status === 'deleted') itemClasses.push(attachModalClasses.itemDelete)
              else if (x.status === 'new') itemClasses.push(attachModalClasses.itemNew)

              return (
                <Grid key={x.id + i.toString()} item xs={6} sm={4} md={3} lg={2}>
                  <div className={itemClasses.join(' ')}>
                    <div className={attachModalClasses.itemHeader}>
                      <Typography variant='body1' noWrap>
                        {x.name}
                      </Typography>
                      <Tooltip title={x.status === 'deleted' ? 'Restore' : 'Delete'} arrow>
                        <IconButton
                          size='small'
                          color={x.status === 'deleted' ? 'primary' : 'secondary'}
                          onClick={() => this.handleTriggerDeleteItemClick(x)}
                        >
                          {x.status === 'deleted' ? <ReplayIcon fontSize='small' /> : <RemoveIcon fontSize='small' />}
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div className={attachModalClasses.itemContent}>
                      <img src={x.thumbnail || x.url} alt={x.name} />
                    </div>
                  </div>
                </Grid>
              )
            })}
          </Grid>
        </div>
        <Divider />
        <div className={attachModalClasses.footer}>
          {this.attachItemConfigs.map((config) => {
            const count = config.count || 0
            return (
              <Stack key={config.label} direction='row' gap={0.5} alignItems='center'>
                <SquareIcon fontSize='small' sx={{ color: config.color }} />
                <Typography variant='body2'>
                  {config.label} ({count})s
                </Typography>
              </Stack>
            )
          })}
        </div>
        <div className={attachModalClasses.dragPanel}>
          <div>
            <Typography variant='body2' color='primary' sx={{ fontWeight: 600 }}>
              Drop files here to upload
            </Typography>
          </div>
        </div>
        <div className={attachModalClasses.overlay}>
          <CircularProgress size={36} />
        </div>
      </AttachModalStyled>
    )
  }

  onSaveHandler = async () => {
    const { onChange, onClose, isAutoClose } = this.props
    if (!onChange) return

    this.setState({ isLoading: true })
    let updatedItems = [...this.attachItems]
    onChange(updatedItems, { isSave: true })

    updatedItems = updatedItems.filter((x) => x.status !== 'deleted') // Remove deleted items
    updatedItems = updatedItems.map((x) => {
      const obj = { ...x }
      delete obj.status // Remove status property
      return obj
    })

    this.setState({ isLoading: false, attachs: updatedItems }) // Update state directly to avoid memory leaks
    if (onClose && isAutoClose !== false) onClose()
  }

  onFileChangeHandler = (files: File[]) => {
    const validFiles = files.filter((f) => isValidFileType(f.type))
    if (validFiles.length < 1) return
    const items = validFiles.map((x) => fileToAttachItem(x, { status: 'new' }))
    const newItems = [...items, ...this.attachItems]
    this.setState({ attachs: newItems }) // Update state directly to avoid memory leaks
  }

  handleTriggerDeleteItemClick = (item: IAttachItem) => {
    const updatedItems = this.attachItems.reduce<IAttachItem[]>((a, b) => {
      const obj = { ...b }
      if (obj.id === item.id) {
        if (obj.status === 'new') return a // Do not delete new item, they are not saved yet
        obj.status = obj.status === 'deleted' ? 'old' : 'deleted'
      }
      a.push(obj)
      return a
    }, [])
    this.setState({ attachs: updatedItems }) // Update state directly to avoid memory leaks
  }

  fileInputRef = React.createRef<HTMLInputElement>()
  handleIconClick = () => {
    this.fileInputRef.current?.click()
  }

  handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      this.onFileChangeHandler(Array.from(files))
    }
  }

  dragCounter = 0
  handleDragEnter = () => {
    this.dragCounter++
    this.setState({ isDragging: true })
  }

  handleDragLeave = () => {
    this.dragCounter--
    if (this.dragCounter === 0) {
      this.setState({ isDragging: false })
    }
  }

  handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!this.state.isDragging) return // If not dragging, do nothing
    this.setState({ isDragging: false })
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      this.onFileChangeHandler(files)
    }
  }
}
export default AttachModal
