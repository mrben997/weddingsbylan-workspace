import React, { Component } from 'react'
import { Backdrop, Box, Modal, SxProps, styled } from '@mui/material'

export interface GlobalModalState {
  sx?: SxProps
  sxWrap?: SxProps
  /** @default true */
  backdropActivated?: boolean
  onClose?: (reason?: TModalReason) => void
  renderContent?: () => React.ReactNode
}

export type TModalReason = 'backdropClick' | 'escapeKeyDown'

interface GlobalModalProps {}

export type TShowModal = (value: GlobalModalState) => void

export type TCloseModal = (event?: {}, reason?: TModalReason) => void

export interface IGlobalModalContext {
  show: TShowModal
  close: TCloseModal
}

export const GlobalModalContext = React.createContext<IGlobalModalContext>({
  close: () => {
    console.warn('GlobalModal provider not found!')
  },
  show: () => {
    console.warn('GlobalModal provider not found!')
  }
})

export interface IMapGlobalModal {
  context: IGlobalModalContext
}

export const mapGlobalModalContext = (context: (state: IGlobalModalContext) => React.ReactNode) => (
  <GlobalModalContext.Consumer>{context}</GlobalModalContext.Consumer>
)

export class GlobalModal extends Component<React.PropsWithChildren<GlobalModalProps>, GlobalModalState> implements IGlobalModalContext {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  show: TShowModal = (value) => {
    this.setState(value)
  }

  close: TCloseModal = (_, reason) => {
    if (reason === 'backdropClick' && this.state.backdropActivated === false) return
    this.setState({ renderContent: undefined })
  }

  render() {
    return (
      <GlobalModalContext.Provider value={this}>
        {this.props.children}
        <Modal
          open={!!this.state.renderContent}
          onClose={this.close}
          slots={{ backdrop: Backdrop }}
          slotProps={{ backdrop: { timeout: 300 } }}
          sx={this.state.sx}
        >
          <Wrapper sx={this.state.sxWrap}>{this.renderContent()}</Wrapper>
        </Modal>
      </GlobalModalContext.Provider>
    )
  }

  renderContent = (): React.ReactNode => {
    return this.state.renderContent ? this.state.renderContent() : <></>
  }
}
export default GlobalModal

const Wrapper = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  outline: 'none'
})

export interface IApiGlobalModalContextProps {
  contextGlobalModal: IGlobalModalContext
}

export const withApiGlobalModalContext = <P extends IApiGlobalModalContextProps>(Component: React.ComponentType<P>) => {
  return (props: Omit<P, keyof IApiGlobalModalContextProps>) => {
    return (
      <GlobalModal>
        {mapGlobalModalContext((context) => (
          <Component {...(props as P)} contextGlobalModal={context} />
        ))}
      </GlobalModal>
    )
  }
}

export const withApiGlobalModalConsumerContext = <P extends IApiGlobalModalContextProps>(Component: React.ComponentType<P>) => {
  return (props: Omit<P, keyof IApiGlobalModalContextProps>) => {
    return mapGlobalModalContext((context) => <Component {...(props as P)} contextGlobalModal={context} />)
  }
}
