import { Component, ComponentType } from "react";
import { EFetchStatus, IHocComponentProps } from "./types";
import { Box, CircularProgress } from "@mui/material";

export const ErrorView = () => {
    return <>Error</>
}
export const LoadingView = () => {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <CircularProgress />
    </Box>
}

interface IHocOption {

}



export const HocLayzy = <TProp extends IHocComponentProps = IHocComponentProps>(WrapComponent: ComponentType<TProp>) => {
    return (options?: IHocOption) => {
        class HocComponent extends Component<TProp> {
            /**
             *
             */
            constructor(props: TProp) {
                super(props);
            }
            MapContent: { [key in (EFetchStatus)]?: ComponentType<TProp> } = {
                Error: ErrorView,
                Loading: LoadingView,
                Loaded: WrapComponent
            }

            tokenSource?: { abort: () => void }
            componentWillUnmount(): void {
                this.tokenSource?.abort()
            }

            componentDidMount(): void {
                if (this.props.FetchData) {
                    this.tokenSource = this.props.FetchData()
                }
            }

            renderContent = () => {
                const Content = this.MapContent[this.props.status] ?? (() => <>None</>)
                return <Content {...this.props} />
            }
            render() {
                return <>{this.renderContent()}</>
            }
        }

        return HocComponent
    }
}
