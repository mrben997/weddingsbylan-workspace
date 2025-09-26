import { HocLayzy } from '@/admin-react-app/reduxes/hoc.lazy'
import { ViewBase } from './view-base'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from './redux.map'

export const HocComp = HocLayzy(ViewBase)()

export const ReduxNews = connect(mapStateToProps, mapDispatchToProps)(HocComp)
