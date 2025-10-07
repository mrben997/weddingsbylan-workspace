'use client'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import {
  Alignment,
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  AutoImage,
  Autosave,
  BlockQuote,
  BlockToolbar,
  Bold,
  CloudServices,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  FullPage,
  GeneralHtmlSupport,
  Heading,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  Paragraph,
  SelectAll,
  ShowBlocks,
  SimpleUploadAdapter,
  SourceEditing,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  Underline,
  Undo,
  // Base64UploadAdapter,
  List,
  ListProperties,
  Markdown,
  MediaEmbed,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  TodoList
} from 'ckeditor5'
import 'ckeditor5/ckeditor5.css'
import './CkEditor.css'
import ReactDOM from 'react-dom'
import { EventInfo } from 'framer-motion'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface ITextCkEditorProps<TEditor = ClassicEditor> {
  onReady?: (editor: TEditor) => void
  onAfterDestroy?: (editor: TEditor) => void
  onError?: (error: Error, details: any) => void
  onChange?: (event: EventInfo, editor: TEditor) => void
  onFocus?: (event: EventInfo, editor: TEditor) => void
  onBlur?: (event: EventInfo, editor: TEditor) => void
  name?: string
  defaultValue?: string
}

export const TextCkEditor: FC<ITextCkEditorProps<ClassicEditor>> = (props) => {
  const editorContainerRef = useRef(null)
  const editorRef = useRef(null)
  const [isLayoutReady, setIsLayoutReady] = useState(false)
  const [content, SetContent] = useState(props.defaultValue)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    setIsLayoutReady(true)
    return () => setIsLayoutReady(false)
  }, [])
  useEffect(() => {
    if (isFullscreen) {
      document.addEventListener('keydown', onKeyDown)
    } else {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isFullscreen])
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsFullscreen(false)
    }
  }
  const onFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen)
  }, [isFullscreen])
  const Content = useMemo(
    () => (
      <div className='main-container'>
        <input name={props.name} value={content} hidden onChange={() => {}} />
        <div className='editor-wrap'>
          <div className='editor-container editor-container_classic-editor editor-container_include-block-toolbar' ref={editorContainerRef}>
            <div className='editor-container__editor'>
              <div ref={editorRef}>
                {isLayoutReady && (
                  <CKEditor
                    editor={ClassicEditor}
                    config={{
                      toolbar: {
                        items: [
                          'undo',
                          'redo',
                          '|',
                          'sourceEditing',
                          'showBlocks',
                          '|',
                          'heading',
                          '|',
                          'fontSize',
                          'fontFamily',
                          'fontColor',
                          'fontBackgroundColor',
                          '|',
                          'bold',
                          'italic',
                          'underline',
                          '|',
                          'link',
                          'insertImage',
                          'insertTable',
                          'blockQuote',
                          'alignment',
                          'htmlEmbed',
                          '|',
                          'outdent',
                          'indent',
                          'undo',
                          '|',
                          'mediaEmbed',
                          '|',
                          'bulletedList',
                          'numberedList',
                          'todoList'
                        ],
                        shouldNotGroupWhenFull: false
                      },
                      plugins: [
                        AccessibilityHelp,
                        Autoformat,
                        AutoImage,
                        Autosave,
                        BlockQuote,
                        Alignment,
                        BlockToolbar,
                        Bold,
                        CloudServices,
                        Essentials,
                        FontBackgroundColor,
                        FontColor,
                        FontFamily,
                        FontSize,
                        FullPage,
                        GeneralHtmlSupport,
                        Heading,
                        HtmlComment,
                        HtmlEmbed,
                        ImageBlock,
                        ImageCaption,
                        ImageInline,
                        ImageInsert,
                        ImageInsertViaUrl,
                        ImageResize,
                        ImageStyle,
                        ImageTextAlternative,
                        ImageToolbar,
                        ImageUpload,
                        Indent,
                        IndentBlock,
                        Italic,
                        Link,
                        LinkImage,
                        Paragraph,
                        SelectAll,
                        ShowBlocks,
                        SimpleUploadAdapter,
                        SourceEditing,
                        Table,
                        TableCaption,
                        TableCellProperties,
                        TableColumnResize,
                        TableProperties,
                        TableToolbar,
                        TextTransformation,
                        Underline,
                        Undo,
                        AccessibilityHelp,
                        // Base64UploadAdapter,
                        List,
                        ListProperties,
                        Markdown,
                        MediaEmbed,
                        PasteFromMarkdownExperimental,
                        PasteFromOffice,
                        TodoList
                      ],
                      blockToolbar: [
                        'fontSize',
                        'fontColor',
                        'fontBackgroundColor',
                        '|',
                        'bold',
                        'italic',
                        '|',
                        'link',
                        'insertImage',
                        'insertTable',
                        '|',
                        'outdent',
                        'indent'
                      ],
                      fontFamily: {
                        supportAllValues: true
                      },
                      fontSize: {
                        options: [10, 12, 14, 'default', 18, 20, 22],
                        supportAllValues: true
                      },
                      heading: {
                        options: [
                          {
                            model: 'paragraph',
                            title: 'Paragraph',
                            class: 'ck-heading_paragraph'
                          },
                          {
                            model: 'heading1',
                            view: 'h1',
                            title: 'Heading 1',
                            class: 'ck-heading_heading1'
                          },
                          {
                            model: 'heading2',
                            view: 'h2',
                            title: 'Heading 2',
                            class: 'ck-heading_heading2'
                          },
                          {
                            model: 'heading3',
                            view: 'h3',
                            title: 'Heading 3',
                            class: 'ck-heading_heading3'
                          },
                          {
                            model: 'heading4',
                            view: 'h4',
                            title: 'Heading 4',
                            class: 'ck-heading_heading4'
                          },
                          {
                            model: 'heading5',
                            view: 'h5',
                            title: 'Heading 5',
                            class: 'ck-heading_heading5'
                          },
                          {
                            model: 'heading6',
                            view: 'h6',
                            title: 'Heading 6',
                            class: 'ck-heading_heading6'
                          }
                        ]
                      },
                      htmlSupport: {
                        allow: [
                          {
                            name: /^.*$/,
                            styles: true,
                            attributes: true,
                            classes: true
                          }
                        ]
                      },
                      image: {
                        toolbar: [
                          'toggleImageCaption',
                          'imageTextAlternative',
                          '|',
                          'imageStyle:inline',
                          'imageStyle:wrapText',
                          'imageStyle:breakText',
                          '|',
                          'resizeImage'
                        ]
                      },
                      initialData: content,
                      link: {
                        addTargetToExternalLinks: true,
                        defaultProtocol: 'https://',
                        decorators: {
                          toggleDownloadable: {
                            mode: 'manual',
                            label: 'Downloadable',
                            attributes: {
                              download: 'file'
                            }
                          }
                        }
                      },
                      list: {
                        properties: {
                          styles: true,
                          startIndex: true,
                          reversed: true
                        }
                      },
                      placeholder: 'Type or paste your content here!',
                      table: {
                        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
                      },
                      simpleUpload: {
                        uploadUrl: `${window.location.origin}/api/upload/ckeditor`
                      }
                    }}
                    onChange={(e, ed) => {
                      const c = ed.getData()
                      SetContent(c)
                    }}
                    // {...props}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    [isLayoutReady, content]
  )
  return isFullscreen ? (
    ReactDOM.createPortal(
      <div
        className='full-screen-mode'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2000,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          background: 'white'
        }}
      >
        <div style={{ maxWidth: '1000px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
            <button className='full-screen' onClick={onFullscreen}>
              <i className='material-icons'>fullscreen</i>
            </button>
          </div>
          {Content}
        </div>
      </div>,
      document.body
    )
  ) : (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
        <button className='full-screen' onClick={onFullscreen}>
          <i className='material-icons'>fullscreen</i>
        </button>
      </div>
      {Content}
    </div>
  )
}

export default TextCkEditor
