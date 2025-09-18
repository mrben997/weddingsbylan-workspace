import React, { Component } from 'react'
import { Box, Button, Card, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { MapGlobalModalContext } from '../../ApiContext'

interface IParam<TModel> {
  title?: string
  content: (value?: TModel) => JSX.Element
}
const CreateFormComfirm = function <TModel = any>(param?: IParam<TModel>) {
  interface IProps {
    data?: TModel
    onSubmit: (value?: TModel) => void
    title?: string
  }
  class FormConfirm extends Component<React.PropsWithChildren<IProps>> {
    render() {
      const content = this.props.children || (param?.content ? param?.content(this.props.data) : undefined)
      const title = this.props.title ?? param?.title ?? 'Are you sure?'
      return (
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {MapGlobalModalContext((context) => (
            <Card>
              <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
              <DialogContent>{content}</DialogContent>
              <DialogActions>
                <Button
                  color='error'
                  onClick={() => {
                    context.CloseModal()
                    this.props.onSubmit && this.props.onSubmit(this.props.data)
                  }}
                >
                  yes
                </Button>
                <Button color='inherit' onClick={context.CloseModal}>
                  no
                </Button>
              </DialogActions>
            </Card>
          ))}
        </Box>
      )
    }
  }
  return FormConfirm
}
export default CreateFormComfirm
