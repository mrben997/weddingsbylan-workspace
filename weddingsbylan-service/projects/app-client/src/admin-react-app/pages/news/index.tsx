import { HocLayzy } from '@/admin-react-app/reduxes/hoc.lazy'
import { NewsPage } from './view-base'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from './redux.map'

export const HocComp = HocLayzy(NewsPage)()

export const ReduxNews = connect(mapStateToProps, mapDispatchToProps)(HocComp)
