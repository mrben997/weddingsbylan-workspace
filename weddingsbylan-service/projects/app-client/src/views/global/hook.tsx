'use client'
import { FC, useEffect } from 'react'

export const useHeaderInitial = () => {
  useEffect(() => {
    try {
      const menuArea = document.querySelector('.app-menu-area') as HTMLElement
      if (!menuArea) return
      const menuBtn = menuArea.querySelector('.app-menu-btn') as HTMLElement
      if (!menuBtn) return
      const memuTogger = menuArea.querySelector('.app-menu-togger') as HTMLElement
      if (!memuTogger) return

      menuBtn.addEventListener('click', () => {
        menuArea.classList.toggle('active')
      })

      document.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (!menuBtn.contains(target) && !memuTogger.contains(target)) {
          menuArea.classList.remove('active')
        }
      })
    } catch (error) {
      console.error('Error initializing menu:', error)
    }
  }, [])
}

export const AppHeaderInitial: FC = () => {
  useHeaderInitial()
  return <></>
}

// menuInitialize: (): void => {
//     if (appThis.initialized) return
//     try {
//       const menuArea = document.querySelector('.app-menu-area') as HTMLElement
//       if (!menuArea) return
//       const menuBtn = menuArea.querySelector('.app-menu-btn') as HTMLElement
//       if (!menuBtn) return
//       const memuTogger = menuArea.querySelector('.app-menu-togger') as HTMLElement
//       if (!memuTogger) return

//       menuBtn.addEventListener('click', () => {
//         menuArea.classList.toggle('active')
//       })

//       // Close menu on outside click
//       document.addEventListener('click', (event: MouseEvent) => {
//         const target = event.target as HTMLElement
//         if (!menuBtn.contains(target) && !memuTogger.contains(target)) {
//           menuArea.classList.remove('active')
//         }
//       })
//     } catch (error) {
//       console.error('Error initializing menu:', error)
//     }
//   },
