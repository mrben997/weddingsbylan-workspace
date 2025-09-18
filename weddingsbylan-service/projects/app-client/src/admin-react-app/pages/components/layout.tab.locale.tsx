import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TLanguage } from '@/locales/types';

interface TabPanelProps {
    children?: React.ReactNode;
    value: TLanguage;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


interface ILayoutTabLocaleProps {
    children: (locale: TLanguage) => React.ReactNode
    locale?: TLanguage
}
export const LayoutTabLocale: React.FC<ILayoutTabLocaleProps> = (props) => {
    const [value, setValue] = React.useState<TLanguage>(props.locale ?? "vn");

    const handleChange = (event: React.SyntheticEvent, newValue: TLanguage) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', position: 'relative', minHeight: '600px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'sticky', top: 0 }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {["vn", "en"].map((x, i) => {
                        return <Tab key={"key" + i} label={x} value={x} {...a11yProps(i)} />
                    })}
                </Tabs>
            </Box>
            {props.children(value)}
        </Box>
    );
}
