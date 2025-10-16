'use server'
import '../styles/header.scss'
import { FC } from 'react'
import { ISearchParams } from '@/app/types'
import { ISettingForm } from '@/admin-react-app/pages/settings/setting.form.types'
import { getEditModeKey } from '@/shared/components/edit.mode'
import { ImagePath } from '@/shared/config'
import AppMenu from './app-menu'

export interface IAppHeaderProps extends ISearchParams {
  data?: ISettingForm[] | null
  // locale: string
}

const AppHeader: FC<IAppHeaderProps> = async (props) => {
  const data = props.data ? props.data[0] : undefined
  console.log(props.data);
  
  return (
    <header className='header-area'>
      <div className='header-content'>
        <div className='header-section header-left'>
          <div className='logo-area theme-dark' {...getEditModeKey('Setting')}>
            {/* <img src="images/logo.png" alt="weddingsbylan-logo" /> */}
            <div className='img-bg' style={{ backgroundImage: `url('${ImagePath}/${data?.LogoUrl}')` }}></div>
          </div>
        </div>
        <AppMenu />
      </div>
    </header>
  )
}
export default AppHeader
