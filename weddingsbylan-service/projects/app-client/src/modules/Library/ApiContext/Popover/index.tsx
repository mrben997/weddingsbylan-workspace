import React, { Component } from 'react'
import { Popover, PopoverProps, PopoverVirtualElement } from '@mui/material'
import ContentDefault from './ContentDefault'

export interface IPopoverOptions {
  anchorEl?: Element | (() => Element) | PopoverVirtualElement | (() => PopoverVirtualElement) | null
  popoverProps?: Omit<PopoverProps, 'open'>
  content: JSX.Element
}
export type TShowPopover = (option: IPopoverOptions) => void
export type TClosePopover = (reason?: 'backdropClick' | 'escapeKeyDown') => void

export interface IApiPopoverContext {
  showPopover: TShowPopover
  closePopover: TClosePopover
}
export const ApiPopoverContext = React.createContext<IApiPopoverContext>({} as any)
export const MapApiPopoverContext = (context: (state: IApiPopoverContext) => React.ReactNode) => (
  <ApiPopoverContext.Consumer>{context}</ApiPopoverContext.Consumer>
)

interface IProps {}
interface IState extends IPopoverOptions {}
type TProps = React.PropsWithChildren<IProps>
class ApiPopover extends Component<TProps, IState> implements IApiPopoverContext {
  constructor(props: any) {
    super(props)
    this.state = { anchorEl: null, content: <ContentDefault /> }
  }
  render() {
    return (
      <ApiPopoverContext.Provider value={this}>
        {this.props.children}
        <Popover
          sx={{ '& .MuiPaper-root.MuiPaper-elevation': { overflow: 'hidden' } }}
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={(_, reason) => this.closePopover(reason)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          {...this.state.popoverProps}
        >
          {this.state.content}
        </Popover>
      </ApiPopoverContext.Provider>
    )
  }
  showPopover = (option: IPopoverOptions) => {
    clearTimeout(this.timer)
    this.setState({ ...option })
  }
  timer: any
  closePopover: TClosePopover = () => {
    clearTimeout(this.timer)
    this.setState({ anchorEl: null }, () => {
      this.timer = setTimeout(() => {
        this.setState({ content: <ContentDefault /> })
      }, 500)
    })
  }
}
export default ApiPopover

export interface IApiPopoverContextProps {
  contextPopover: IApiPopoverContext
}
export const withApiPopoverContext = <P extends IApiPopoverContextProps>(Component: React.ComponentType<P>) => {
  return (props: Omit<P, keyof IApiPopoverContextProps>) => {
    return (
      <ApiPopover>
        {MapApiPopoverContext((context) => (
          <Component {...(props as P)} contextPopover={context} />
        ))}
      </ApiPopover>
    )
  }
}
