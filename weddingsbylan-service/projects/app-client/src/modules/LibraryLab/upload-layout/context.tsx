import { createContext, ReactNode, useContext } from 'react'
import { IUploadLayoutContext } from './types'

export const UploadLayoutContext = createContext<IUploadLayoutContext>({} as any)

export const mapUploadLayoutContext = (context: (state: IUploadLayoutContext) => ReactNode) => (
  <UploadLayoutContext.Consumer>{context}</UploadLayoutContext.Consumer>
)

export const useUploadLayoutContext = () => {
  return useContext(UploadLayoutContext)
}
