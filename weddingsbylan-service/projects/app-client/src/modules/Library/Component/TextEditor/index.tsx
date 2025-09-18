// /* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react'
import { Box, styled, SxProps, Theme } from '@mui/material'
/**
 * yarn add react-quill@2.0.0
 */
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const EditorToolbar: any = {}

EditorToolbar.formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align',
  'color',
  'background'
]

EditorToolbar.modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    [{ color: [] }, { background: [] }],
    ['link', 'image'],
    ['clean']
  ]
}

interface IProps {
  name: string
  sx?: SxProps<Theme>
  readOnly?: boolean
  defautValue?: string
  error?: boolean
  onBlur?: () => void
}

interface IState {
  value: string
}

export default class TextEditor extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { value: props.defautValue ?? '' }
  }

  id = 0
  render() {
    return (
      <Wrapper sx={this.props.sx} {...(this.props.error ? { className: 'error' } : {})}>
        {!this.props.readOnly && <input key={++this.id} name={this.props.name} defaultValue={this.state.value} hidden />}
        <ReactQuill
          readOnly={this.props.readOnly}
          placeholder='Enter the message'
          value={this.state.value}
          modules={EditorToolbar.modules}
          formats={EditorToolbar.formats}
          onChange={this.handleChange}
          onBlur={this.props.onBlur}
        />
      </Wrapper>
    )
  }

  handleChange = (value: string) => {
    let str = value
    if (value === '<p><br></p>') str = ''
    this.setState({ value: str })
  }
}

const borderColor = '#d32f2f'

const Wrapper = styled(Box)({
  margin: 0,
  minHeight: '450px',
  display: 'flex',
  '& .quill': { flex: 1 },
  '& .ql-container': {
    height: 'calc(100% - 42px)',
    borderBottomLeftRadius: '6px',
    borderBottomRightRadius: '6px'
  },
  '& .ql-toolbar': {
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px'
  },
  '&.error .ql-toolbar': {
    borderTopColor: borderColor,
    borderLeftColor: borderColor,
    borderRightColor: borderColor
  },
  '&.error .ql-container': {
    borderBottomColor: borderColor,
    borderLeftColor: borderColor,
    borderRightColor: borderColor
  },
  '&.error .ql-editor.ql-blank::before': {
    color: borderColor
  }
})
