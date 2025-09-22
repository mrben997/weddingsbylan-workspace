// 'use server'
// // import { SettingStore } from '@/services/setting.service'
// import { ISearchParams } from '@/app/types'
// import { getEditModeKey } from '../components/edit.mode'
// import { INavFormData, ISettingForm } from '@/admin-react-app/pages/settings/setting.form.types'
// import { FC } from 'react'
// import { ImagePath } from '../config'
// import Link from 'next/link'

// const defaultNavProps: Partial<INavFormData> = {
//   Navs: [
//     { Title: 'Home', Url: '/' },
//     { Title: 'Photography', Url: '/photography' },
//     { Title: 'Makeup & Hair', Url: '/makeup-and-hair' },
//     { Title: 'Portfolio', Url: '/portfolio' },
//     { Title: 'Contacts Us', Url: '/contact-us' }
//   ]
// }

// interface IHeaderProps extends ISearchParams {
//   data?: ISettingForm[] | null
//   // locale: string
// }

// const Header: FC<IHeaderProps> = async (props) => {
//   const data = props.data ? props.data[0] : undefined
//   return (
//     <header className='header-area'>
//       <div className='header-content'>
//         <div className='header-section header-left'>
//           <div className='logo-area theme-dark' {...getEditModeKey('Setting')}>
//             {/* <img src="images/logo.png" alt="weddingsbylan-logo" /> */}
//             <div className='img-bg' style={{ backgroundImage: `url('${ImagePath}/${data?.LogoUrl}')` }}></div>
//           </div>
//         </div>
//         <div className='app-menu-area'>
//           <button className='app-menu-btn fixed' aria-label='Toggle Menu'>
//             <span></span>
//             <span></span>
//             <span></span>
//           </button>
//           <div className='app-menu-togger'>
//             <ul className='app-menu-navs'>
//               {defaultNavProps.Navs?.map((nav, index) => (
//                 <li className='app-menu-nav' style={{ transitionDelay: `${(index + 1) * 100}ms` }} key={nav.Url}>
//                   <a href={nav.Url} className='typography-h5'>
//                     {nav.Title}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }
// export default Header
