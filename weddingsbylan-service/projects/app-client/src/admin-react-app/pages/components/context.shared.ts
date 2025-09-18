import React from "react"

interface ICompnentPropsContext<IProps> {
    getProps: () => IProps
}


export const CreatePropsContext = <Iprops>() => {
    const NewsPageContext = React.createContext<ICompnentPropsContext<Iprops>>({} as any)
    return NewsPageContext
}