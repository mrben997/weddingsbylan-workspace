import React, { Component } from 'react'
import { CircularProgress, IconButton, Tooltip, Typography } from '@mui/material'
import { MapGlobalModalContext } from '../../Library/ApiContext'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import { attachWidgetClasses, AttachWidgetStyled } from './styled'
import { AttachChangeFunction, IAttachItem } from './types'
import { allowFileTypes, fileToAttachItem, isValidFileType } from './helpers'
import AttachModal from './modal'

export interface IAttachWidgetProps {
  value: IAttachItem[]
  onChange?: AttachChangeFunction
  maxDisplayFiles?: number
}

export interface IAttachWidgetState {
  isDragging: boolean
  isLoading: boolean
}

export class AttachWidget extends Component<IAttachWidgetProps, IAttachWidgetState> {
  constructor(props: IAttachWidgetProps) {
    super(props)
    this.state = { isDragging: false, isLoading: false }
  }

  get attachItems() {
    return this.props.value
  }

  render() {
    const { isDragging, isLoading } = this.state
    const rootClasses = [attachWidgetClasses.root]
    if (isDragging && !isLoading) rootClasses.push(attachWidgetClasses.dragging)
    if (isLoading) rootClasses.push(attachWidgetClasses.loading)
    const list = this.attachItems.slice(0, (this.props.maxDisplayFiles || 5) + 1)
    return (
      <AttachWidgetStyled
        className={rootClasses.join(' ')}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <div className={attachWidgetClasses.content}>
          <input ref={this.fileInputRef} type='file' hidden multiple onChange={this.handleFileChange} accept={allowFileTypes.join(',')} />
          <IconButton color='primary' className={attachWidgetClasses.inputButton} onClick={this.handleIconClick}>
            <AttachFileIcon />
          </IconButton>
          <div className={attachWidgetClasses.list}>
            {list.length < 1 && (
              <Typography variant='body2' color='text.secondary' sx={{ paddingRight: 3 }}>
                No files, drag and drop here
              </Typography>
            )}
            {list.map((item, index) => (
              <IconButton key={index} component='a' href={item.url} target='_blank' className={attachWidgetClasses.listItem}>
                <img src={item.thumbnail || item.url} alt={item.name} />
              </IconButton>
            ))}
          </div>
          {this.renderMoreButton()}
        </div>
        <div className={attachWidgetClasses.dragPanel}>
          <div>
            <Typography variant='body2' color='primary' sx={{ fontWeight: 600 }}>
              Drop files here to upload
            </Typography>
          </div>
        </div>
        <div className={attachWidgetClasses.overlay}>
          <CircularProgress size={24} />
        </div>
      </AttachWidgetStyled>
    )
  }

  renderMoreButton() {
    return MapGlobalModalContext((context) => {
      const { value, onChange } = this.props
      const handleClick = () => {
        context.ShowModal({
          backdropActivated: true,
          ContentModal: () => <AttachModal value={value} onChange={onChange} onClose={context.CloseModal} isAutoClose={false} />
        })
      }
      return (
        <Tooltip title='More details' placement='top' arrow>
          <IconButton className={attachWidgetClasses.moreButton} onClick={handleClick}>
            <OpenInFullIcon />
          </IconButton>
        </Tooltip>
      )
    })
  }

  onChangeHandler = async (files: File[]) => {
    const validFiles = files.filter((f) => isValidFileType(f.type))
    if (!this.props.onChange || validFiles.length < 1) return
    this.setState({ isLoading: true })
    const items = validFiles.map((x) => fileToAttachItem(x, { status: 'new' }))
    let updatedItems = [...items, ...this.attachItems]

    this.setState({ isLoading: false })
    this.props.onChange(updatedItems, { isSave: true })
  }

  fileInputRef = React.createRef<HTMLInputElement>()
  handleIconClick = () => {
    this.fileInputRef.current?.click()
  }

  handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      this.onChangeHandler(Array.from(files))
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
    this.onChangeHandler(files)
  }
}
export default AttachWidget
