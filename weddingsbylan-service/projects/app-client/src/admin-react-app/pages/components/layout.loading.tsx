import { Box, CircularProgress } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

interface ILayoutLoadingProps {
    loading: boolean
}
export const LayoutLoading: FC<PropsWithChildren<ILayoutLoadingProps>> = (props) => {
    return (
        <>
            {props.children}
            <Box sx={{
                position: 'absolute', top: 0, left: 0, background: 'white',
                width: '100%', height: '100%', zIndex: 200,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <CircularProgress />
            </Box>
        </>
    );
}
