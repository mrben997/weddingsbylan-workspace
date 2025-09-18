import { Component, ReactNode } from "react";
import { Box, Typography } from "@mui/material";
class Dashboard extends Component {
    render() {
        return <Box sx={{
            display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center',
            background: 'url(/public/images/Background_admin.webp)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
            {/* <Typography variant="h3" sx={{ filter: 'blur(1px)', color: 'green' }}>QUẢN TRỊ WEBSITE BẢO VỆ ANH HÀO!</Typography> */}
        </Box>
    }
}

export default Dashboard