import React, { Component } from 'react'
import { Box, styled } from '@mui/material'
import { useLocation } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { GetMRParam } from './helper'

export interface IModalRouteAbstract {
  refresh: () => void
}

export const MRAccessory: { handler?: IModalRouteAbstract } = {}

const CreateModalRoute = function <RouteKey extends string>(RouteConfigs: { element?: JSX.Element, Path: RouteKey }[]) {
  const RouteChangeLogger: React.FC<IModalRouteAbstract> = ({ refresh }) => {
    const location = useLocation()
    React.useEffect(() => {
      refresh()
    }, [location, location.search, refresh])
    return <></>
  }

  class ModalRoute extends Component implements IModalRouteAbstract {
    refresh = () => {
      this.forceUpdate()
    }
    componentDidMount(): void {
      MRAccessory.handler = this
    }
    componentWillUnmount(): void {
      MRAccessory.handler = undefined
    }
    render() {
      return (
        <>
          {this.renderModalView()}
          <RouteChangeLogger refresh={this.refresh} />
        </>
      )
    }
    renderModalView = () => {
      const routes = this.getRoutes()
      this.toggleBodyClass(routes.length > 0)
      return routes.map((route, index) => {
        return (
          <React.Fragment key={route.Path + index}>
            {ReactDOM.createPortal(<ModalBox>{'element' in route ? route.element : <></>}</ModalBox>, document.body)}
          </React.Fragment>
        )
      })
    }
    isShowModal = () => {
      return !!GetMRParam()
    }
    getRoutes = () => {
      return GetMRParam().map((mdName) => RouteConfigs.find((x) => x.Path === mdName) ?? { Path: mdName, element: <></> })
    }
    toggleBodyClass(isVisible: boolean) {
      if (isVisible) {
        document.body.classList.add('no-scroll')
      } else {
        document.body.classList.remove('no-scroll')
      }
    }
  }

  return ModalRoute
}
export default CreateModalRoute

const ModalBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 2000
}))
