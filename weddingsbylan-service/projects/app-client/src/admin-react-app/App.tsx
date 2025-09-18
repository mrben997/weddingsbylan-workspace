import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import ResponsiveDrawer from "./layout"
import { ConfigRoute, ElementDefault, IRoute, RouteKey } from "./layout/config"
import { Provider } from "react-redux";
import store from "./reduxes";
import { AlertGlobal, GlobalModal } from "@/modules/Library/ApiContext";
import { useEffect } from "react";
import { checkAuth } from "./layout/auth.helper";
import { authenticationService } from "./services/service.authentitcation";
import Login from "./pages/login";
import CreateModalRoute from "@/modules/Library/Layout/ModalRoute/CreatetModalRoute";


const GenerateRouteConfig = (item: IRoute<RouteKey>[]) => {
    return item.map(X => ({
        Path: X.Key,
        element: X.Element ? <X.Element /> : undefined
    }))
}

const LayoutModalRoute = {
    Provider: CreateModalRoute(GenerateRouteConfig(ConfigRoute()))
}

let baseUrl = document.getElementsByTagName('base').item(0)?.getAttribute('href') ?? '';
baseUrl = "/" + baseUrl.substring(baseUrl.length - 1, 1)
console.log(baseUrl);

const renderElement = () => {
    return (
        <>
            <ResponsiveDrawer></ResponsiveDrawer>
            <LayoutModalRoute.Provider />
        </>
    )
}

const router = authenticationService.isAuthenticated() ? createBrowserRouter([
    {
        path: '/',
        element: renderElement(),
        children: ConfigRoute().map(X => {
            const Element = X.Element ?? (() => <ElementDefault>{X.Key}</ElementDefault>)
            return {
                path: X.Key,
                element: <Element />,
                loader: () => {
                    const isAuthenticated = authenticationService.isAuthenticated();
                    if (!isAuthenticated) {
                        location.pathname = baseUrl
                    }
                    return {}
                }
            }
        })
    }
], { basename: baseUrl }) : undefined
export const App = () => {

    return authenticationService.isAuthenticated() && router ?
        <Provider store={store}>
            <GlobalModal>
                <RouterProvider router={router} />
            </GlobalModal>
            <AlertGlobal />
        </Provider> : <Login />
}
export default App