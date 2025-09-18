import React, { FC, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'

interface ILayoutMakeupContext<TModel = any> {
  MakeupComponents: { [key in keyof TModel]: JSX.Element }
}
interface ILayoutMakeupProps<TModel> {
  keyMapper?: { [key in keyof TModel]: TModel[key] }
}
interface IParams<TModel> {
  keyMapper?: { [key in keyof TModel]: TModel[key] }
}
const CreateLayoutMakeup = function <TModel>(options?: IParams<TModel>) {
  const LayoutMakeupContext = React.createContext<ILayoutMakeupContext<TModel>>({} as any)
  const LayoutMakeup: FC<PropsWithChildren<ILayoutMakeupProps<TModel>>> = (p) => {
    const keyMapper = useMemo(() => Object.assign({}, options?.keyMapper ?? {}, p.keyMapper ?? {}), [p.keyMapper])
    const context = {
      MakeupComponents: Object.keys(keyMapper).reduce((a, b) => {
        a[b] = <div key={b} mk-key={b}></div>
        return a
      }, {} as any)
    }
    return <LayoutMakeupContext.Provider value={context}>{p.children}</LayoutMakeupContext.Provider>
  }
  return {
    Provider: LayoutMakeup,
    Context: LayoutMakeupContext,
    GetMakeup: (...keys: (keyof TModel)[]) => {
      return (
        <LayoutMakeupContext.Consumer>
          {({ MakeupComponents }) => {
            if (!MakeupComponents) return <></>
            return keys.map((x) => <React.Fragment key={x.toString()}>{MakeupComponents[x]}</React.Fragment>)
          }}
        </LayoutMakeupContext.Consumer>
      )
    },
    ReplaceMake(key: keyof TModel, Element: JSX.Element) {
      return <ReplaceMark keyId={key as string} Element={Element} />
    }
  }
}
export default CreateLayoutMakeup

const ReplaceMark: FC<{ keyId: string; Element: JSX.Element }> = (p) => {
  const memoizedCallback = useCallback(() => {
    const containers = Array.from(document.querySelectorAll(`[mk-key=${p.keyId.toString()}]`))
    if (!containers) return <></>
    return containers.map((x, i) => <React.Fragment key={'mk-key' + i}>{ReactDOM.createPortal(p.Element, x as any)}</React.Fragment>)
  }, [p.keyId, p.Element])
  return <ReplaceElement>{memoizedCallback}</ReplaceElement>
}

const ReplaceElement: FC<{ children: () => React.ReactNode }> = (p) => {
  const [Content, setContent] = useState<React.ReactNode>(<></>)
  useEffect(() => {
    setContent(p.children ?? <></>)
  }, [p.children])
  return <>{Content}</>
}
