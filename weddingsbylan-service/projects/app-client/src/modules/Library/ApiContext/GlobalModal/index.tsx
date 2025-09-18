import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Backdrop, Box, Fade, Grow, Modal, SxProps, styled } from '@mui/material'
import TextCkEditor from '../../Forms/Inputs/CreateTextCkEditor/CkEditor'

interface IBase {
  sx?: SxProps
  sxWrap?: SxProps
  backdropActivated?: boolean
}

export interface OptionModal extends IBase {
  ContentModal?: () => JSX.Element
}
interface GlobalModalState extends IBase {
  ContentModal?: React.JSXElementConstructor<any>
}
interface GlobalModalProps { }

export interface IGlobalModalContext {
  ShowModal: (option: OptionModal) => void
  CloseModal: () => void
}
export const GlobalModalContext = React.createContext<IGlobalModalContext>({} as any)

export enum ContentPosition {
  Center
}
export interface IMapGlobalModal {
  context: IGlobalModalContext
}

export const MapGlobalModalContext = (context: (state: IGlobalModalContext) => React.ReactNode) => (
  <GlobalModalContext.Consumer>{context}</GlobalModalContext.Consumer>
)

export type TShowModal = (option: OptionModal) => void
type TCloseModal = (event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') => void

class GlobalModal extends Component<React.PropsWithChildren<GlobalModalProps>, GlobalModalState> implements IGlobalModalContext {
  constructor(props: any) {
    super(props)
    this.state = {}
  }
  ShowModal: TShowModal = (option: OptionModal) => {
    this.setState({
      ContentModal: option.ContentModal,
      sx: option.sx,
      sxWrap: option.sxWrap,
      backdropActivated: option.backdropActivated
    })
  }
  CloseModal: TCloseModal = (_, reason) => {
    if (reason === 'backdropClick' && !this.state.backdropActivated) return
    this.setState({ ContentModal: undefined })
  }
  GenerateContent = (): JSX.Element => {
    const Content = this.state.ContentModal ?? (() => <></>)
    const Temp = React.forwardRef(() => <Content />)
    return <Temp />
  }
  render() {
    return (
      <GlobalModalContext.Provider value={this}>
        {this.props.children}
        {(!!this.state.ContentModal) ?
          ReactDOM.createPortal(
            <CustomModel
              sx={this.state.sx}
            ><Fade in timeout={300}>
                <Wrapper sx={this.state.sxWrap}>
                  {this.GenerateContent()}
                </Wrapper>
              </Fade>
            </CustomModel>
            , document.body) : <></>}
        {/* <Modal
          open={!!this.state.ContentModal}
          onClose={this.CloseModal}
          slots={{ backdrop: Backdrop }}
          slotProps={{ backdrop: { timeout: 300 } }}
          sx={this.state.sx}
        >
          <Wrapper sx={this.state.sxWrap}>
            {this.GenerateContent()}
          </Wrapper>
        </Modal> */}
      </GlobalModalContext.Provider>
    )
  }
}

export default GlobalModal

const CustomModel = styled(Box)<{}>(({ sx }) => ({
  position: 'absolute',
  top: 0, left: 0, right: 0, width: '100vw', height: '100vh', zIndex: 2000,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', ...(sx ?? {} as any)
}))

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
        {MapGlobalModalContext((context) => (
          <Component {...(props as P)} contextGlobalModal={context} />
        ))}
      </GlobalModal>
    )
  }
}

export const withApiGlobalModalConsumerContext = <P extends IApiGlobalModalContextProps>(Component: React.ComponentType<P>) => {
  return (props: Omit<P, keyof IApiGlobalModalContextProps>) => {
    return MapGlobalModalContext((context) => <Component {...(props as P)} contextGlobalModal={context} />)
  }
}
