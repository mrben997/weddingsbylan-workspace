import React, { Component, FC, PropsWithChildren } from 'react'
import { Box, IconButton } from '@mui/material'
import { GlobalModalContext, IGlobalModalContext } from '../../ApiContext'
import * as IconsMaterial from '@mui/icons-material'
import { ITableTemplateState, TableTemplateContext } from './CreateTableTemplate'

interface IActionPannel {
  Edit?: JSX.Element
  Details?: JSX.Element
  Delete?: JSX.Element
  Buttons?: {
    Edit?: JSX.Element
    Details?: JSX.Element
    Delete?: JSX.Element
    ExtendBefore?: JSX.Element[]
    ExtendAfter?: JSX.Element[]
  }
}
const EmptyDiv: FC<PropsWithChildren> = (p) => <>{p.children}</>

export class ActionPannel extends Component<IActionPannel> {
  onEdit = () => {
    this.ModalContext?.ShowModal({
      ContentModal: () => this.props.Edit || <EmptyDiv />,
      sx: { display: 'flex', justifyContent: 'center', alignItems: 'center' }
    })
  }
  onDelete = () => {
    this.ModalContext?.ShowModal({
      backdropActivated: true,
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
  getButtons = function* (that: ActionPannel, state: ITableTemplateState) {
    const buttons = Object.assign(
      {},
      {
        Details: (
          <IconButton onClick={that.onDetails} color='inherit'>
            <IconsMaterial.AppRegistration />
          </IconButton>
        ),
        Edit: (
          <IconButton onClick={that.onEdit} color='primary'>
            <IconsMaterial.Edit />
          </IconButton>
        ),
        Delete: (
          <IconButton onClick={that.onDelete} color='error'>
            <IconsMaterial.Delete />
          </IconButton>
        )
      },
      that.props.Buttons ?? {}
    )
    for (let index = 0; index < (that.props.Buttons?.ExtendBefore ?? []).length; index++) {
      const element = (that.props.Buttons?.ExtendBefore ?? [])[index]
      yield <EmptyDiv key={element + 'b' + index}>{element}</EmptyDiv>
    }
    if (that.props.Details || that.props.Buttons?.Details) yield <EmptyDiv key={'Details'}>{buttons.Details}</EmptyDiv>
    if (that.props.Edit || that.props.Buttons?.Edit) yield <EmptyDiv key={'Edit'}>{buttons.Edit}</EmptyDiv>
    if (that.props.Delete || that.props.Buttons?.Delete) yield <EmptyDiv key={'Delete'}>{buttons.Delete}</EmptyDiv>
    for (let index = 0; index < (that.props.Buttons?.ExtendAfter ?? []).length; index++) {
      const element = (that.props.Buttons?.ExtendAfter ?? [])[index]
      yield <EmptyDiv key={element + 'a' + index}>{element}</EmptyDiv>
    }
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
                return <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', gap: '3px' }}>{Array.from(this.getButtons(this, state))}</Box>
              }}
            </TableTemplateContext.Consumer>
          )
        }}
      </GlobalModalContext.Consumer>
    )
  }
}
export default ActionPannel
