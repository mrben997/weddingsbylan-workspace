import { Box } from "@mui/material"
import { FC, PropsWithChildren } from "react"
interface IContainerScrollProps {

}
export const ContainerScroll: FC<PropsWithChildren<IContainerScrollProps>> = (props) => {
    return <Box sx={{ display: 'flex', flex: 1, overflowY: 'auto', flexDirection: 'column', padding: '5px 0' }}>
        {props.children}
    </Box>
}