import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TLanguage } from '@/locales/types';
import { getLocale } from '../ultilities/helper';
import { changeLaunguage } from '@/shared/helper';

export default function LanguageButton() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [lang, setLang] = useState<TLanguage>(getLocale() ?? "vn")

    useEffect(() => { setLang(getLocale() ?? 'vn') }, [getLocale()])

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const onMenuClick = (locale: TLanguage) => {
        setLang(locale)
        handleClose()
        changeLaunguage(locale)
    }
    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ textTransform: 'none' }}
            >
                {lang === "en" ? "English" : "Tiếng việt"}
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={() => onMenuClick("vn")}>Tiếng việt</MenuItem>
                <MenuItem onClick={() => onMenuClick("en")}>English</MenuItem>
            </Menu>
        </div>
    );
}
