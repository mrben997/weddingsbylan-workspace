'use server'
import { FC } from 'react'
import AppHeader, { IAppHeaderProps } from './header'

const AppHeaderSSR: FC<IAppHeaderProps> = async (props) => {
  return <AppHeader {...props} />
}
export default AppHeaderSSR
