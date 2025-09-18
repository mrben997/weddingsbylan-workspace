import React, { Component, FC, PropsWithChildren } from 'react'
import { Box, Button, SxProps, Theme, Typography } from '@mui/material'
import { GlobalModalContext, IGlobalModalContext } from '../../ApiContext'
import * as IconsMaterial from '@mui/icons-material'
import { ITableTemplateState, TableTemplateContext } from './CreateTableTemplate'

const EmptyDiv: FC<PropsWithChildren> = (p) => <>{p.children}</>

interface CRUDPannelProps {
  Create?: JSX.Element
  Edit?: JSX.Element
  Details?: JSX.Element
  Delete?: JSX.Element
  Left?: JSX.Element
  Title?: string
  Right?: JSX.Element
  Buttons?: {
    ExtendBefore?: JSX.Element[]
    ExtendAfter?: JSX.Element[]
  }
  ButtonName?: Partial<{
    Create: string,
    Edit: string,
    Delete: string,
    Details: string
  }>
  sx?: SxProps<Theme>
}

export class CRUDPannel extends Component<CRUDPannelProps> {
  IsMultiple = (state: ITableTemplateState) => {
    return (state.selectionIds?.length ?? 0) > 1
  }
  IsDisplayAction = (state: ITableTemplateState) => {
    return !!state.selectionIds?.length
  }

  getButtons = function* (that: CRUDPannel, state: ITableTemplateState) {
    if (that.props.Edit)
      yield (
        <Button
          onClick={that.onEdit}
          key={'Edit'}
          sx={{ width: 100, height: 30 }}
          color='info'
          disabled={that.IsMultiple(state)}
          startIcon={<IconsMaterial.Edit />}
        >
          {that.props.ButtonName?.Edit ?? "Edit"}
        </Button>
      )
    if (that.props.Delete)
      yield (
        <Button onClick={that.onDelete} key={'Delete'} sx={{ width: 100, height: 30 }} color='error' startIcon={<IconsMaterial.Delete />}>
          {that.props.ButtonName?.Delete ?? "Delete"}
        </Button>
      )
    if (that.props.Details)
      yield (
        <Button
          onClick={that.onDetails}
          key={'Details'}
          sx={{ width: 100, height: 30 }}
          color='inherit'
          disabled={that.IsMultiple(state)}
          startIcon={<IconsMaterial.AppRegistration />}
        >
          {that.props.ButtonName?.Details ?? "Details"}
        </Button>
      )
  }
  getBeforeAffterButtons = function* (that: CRUDPannel, content: JSX.Element) {
    if (that.props.Buttons?.ExtendBefore) {
      for (let index = 0; index < that.props.Buttons.ExtendBefore.length; index++) {
        const element = that.props.Buttons.ExtendBefore[index]
        yield <EmptyDiv key={'bf' + index}>{element}</EmptyDiv>
      }
    }
    yield <EmptyDiv key={'content-ba'}>{content}</EmptyDiv>
    if (that.props.Buttons?.ExtendAfter) {
      for (let index = 0; index < that.props.Buttons.ExtendAfter.length; index++) {
        const element = that.props.Buttons.ExtendAfter[index]
        yield <EmptyDiv key={'af' + index}>{element}</EmptyDiv>
      }
    }
  }
  onCreate = () => {
    this.ModalContext?.ShowModal({
      ContentModal: () => this.props.Create || <EmptyDiv />,
      sx: { display: 'flex', justifyContent: 'center', alignItems: 'center' }
    })
  }
  onEdit = () => {
    this.ModalContext?.ShowModal({
      ContentModal: () => this.props.Edit || <EmptyDiv />,
      sx: { display: 'flex', justifyContent: 'center', alignItems: 'center' }
    })
  }
  onDelete = () => {
    this.ModalContext?.ShowModal({
      ContentModal: () => this.props.Delete || <EmptyDiv />,
      sx: { display: 'flex', justifyContent: 'center', alignItems: 'center' }
    })
  }
  onDetails = () => {
    this.ModalContext?.ShowModal({
      ContentModal: () => this.props.Details || <EmptyDiv />,
      sx: { display: 'flex', justifyContent: 'center', alignItems: 'center' }
    })
  }
  ModalContext?: IGlobalModalContext
  render() {
    return (
      <GlobalModalContext.Consumer>
        {(context) => {
          this.ModalContext = context
          return (
            <TableTemplateContext.Consumer>
              {({ state }) => {
                const buttons = Array.from(this.getButtons(this, state)).map((x, i) => <EmptyDiv key={'key' + i}>{x}</EmptyDiv>)
                return (
                  <Box sx={{ height: 56, display: 'flex', alignItems: 'center', padding: '0 9px', ...this.props.sx }}>
                    {this.props.Left && this.props.Left}
                    {this.props.Title && (
                      <Box>
                        <Typography sx={{ fontWeight: 'bold' }}>{this.props.Title}</Typography>
                      </Box>
                    )}
                    <Box sx={{ flex: 1 }} />
                    {Array.from(
                      this.getBeforeAffterButtons(
                        this,
                        <>
                          {this.props.Create && (
                            <Button onClick={this.onCreate} key={'Create'} sx={{ height: 30 }} variant='contained' startIcon={<IconsMaterial.Add />}>
                              {this.props.ButtonName?.Create ?? "Create"}
                            </Button>
                          )}
                          {buttons.length > 0 && (
                            <Box sx={{ display: this.IsDisplayAction(state) ? 'flex' : 'none' }}>{Array.from(this.getButtons(this, state))}</Box>
                          )}
                        </>
                      )
                    )}
                    {this.props.Right && this.props.Right}
                  </Box>
                )
              }}
            </TableTemplateContext.Consumer>
          )
        }}
      </GlobalModalContext.Consumer>
    )
  }
}
export default CRUDPannel
