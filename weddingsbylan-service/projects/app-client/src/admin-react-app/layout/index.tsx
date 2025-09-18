import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ConfigRoute, RouteKey } from './config';
import { Link, Outlet } from 'react-router-dom';
import { usePathname } from 'next/navigation';
import { AccountCircle } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { authenticationService } from '../services/service.authentitcation';
import { checkAuth } from './auth.helper';
import LanguageButton from './LanguageButton';
import { getTranslation } from '@/locales/helper';
import { getLocale } from '../ultilities/helper';
const drawerWidth = 240;
const headerHeight = 60
interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window?: () => Window;
}
interface IResponsiveDrawerContext {
    openMobile: (value: boolean) => void
}
export const ResponsiveDrawerContext = React.createContext<IResponsiveDrawerContext>({} as any)
export default function ResponsiveDrawer(props: Props) {

    const language = getTranslation(getLocale())

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [routeName, setrouteName] = React.useState('/' + (usePathname().split('/')[2] ?? ''))
    const [drawerMode, setDrawerMode] = React.useState(false)
    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };
    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const onItemClick = React.useCallback((e: React.MouseEvent<HTMLAnchorElement>, name: RouteKey) => {
        setrouteName(name)
    }, [])

    const drawer = (
        <div>
            <Toolbar sx={{
                boxShadow: '0 .25rem .75rem #0000000d',
                border: 0,
                height: headerHeight + 'px'
            }}>
                {/* <Typography variant='h5'>
                    Admin UI
                </Typography> */}
                <Box sx={{ padding: '10px', width: '100%' }} component={'img'} width={300} src={"/public/images/" + language.Logo} className="logo" alt="" />
            </Toolbar>
            <Divider />
            <List>
                {ConfigRoute().filter(x => x.IsMenu !== false).map((Item, index) => (
                    <ListItem key={index + 'key'} disablePadding sx={{ padding: '5px' }}>
                        <ListItemButton
                            onClick={(e) => onItemClick(e, Item.Key)}
                            component={Link} to={Item.Key} selected={Item.Key == routeName}
                            sx={{ borderRadius: '5px' }}
                        >
                            <ListItemIcon>
                                <Item.Icon sx={{ color: Item.Key == routeName ? 'green' : 'rgb(60, 60, 60)' }} />
                            </ListItemIcon>
                            <ListItemText primary={Item.Name} sx={{ color: Item.Key == routeName ? 'green' : 'rgb(60, 60, 60)' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const onLogout = async () => {
        await authenticationService.logout()
        checkAuth()
    }
    const openMobile = React.useCallback(
        (value: boolean) => {
            setDrawerMode(value)
        }, [setDrawerMode]
    )
    return (
        <ResponsiveDrawerContext.Provider value={{ openMobile }}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box
                    sx={{
                        // width: { sm: `calc(100% - ${drawerWidth}px)` },
                        width: '100%',
                        ml: drawerMode ? `0px` : { sm: `${drawerWidth}px` },
                        position: 'fixed',
                        boxShadow: '0 .25rem .75rem #0000000d'
                    }}
                >
                    <Toolbar sx={{
                        //  background: '#76b852',
                        // background:
                        //     "linear-gradient(90deg, rgb(255 255 255) 0%, rgb(236 255 225) 50%)",
                        boxShadow: '0 .25rem .75rem #0000000d',
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: drawerMode ? {} : {
                            md: `calc(100vw - ${drawerWidth}px)`
                        },
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: drawerMode ? {} : { sm: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap component="div" fontWeight={'bold'} sx={{ color: 'darkgreen' }}>
                                QUẢN TRỊ WEBSITE BẢO VỆ ANH HÀO!
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LanguageButton />
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle sx={{ color: 'darkgreen' }} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={onLogout}>
                                    <LogoutIcon />
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>

                    </Toolbar>
                </Box>
                <Box
                    component="nav"
                    sx={{ width: drawerMode ? {} : { md: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onTransitionEnd={handleDrawerTransitionEnd}
                        onClose={handleDrawerClose}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: drawerMode ? 'block' : { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: drawerMode ? 'none' : { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component={'main'}
                    sx={{
                        flexGrow: 1, p: 1, width: {
                            sm: `calc(100% - ${drawerWidth}px)`,
                            height: '100vh'
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 0
                    }}
                >
                    <Toolbar sx={{
                        pointerEvents: 'none',
                        height: headerHeight + 'px'
                    }} />
                    <Box sx={{
                        flex: 1, display: 'flex', height: `calc(100vh - ${headerHeight}px)`,
                        overflowY: 'auto'
                    }}>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </ResponsiveDrawerContext.Provider>
    );
}

export const OpenMobileMenu = () => {
    return <ResponsiveDrawerContext.Consumer>
        {(context) => <ProcessContextMenu context={context} />}
    </ResponsiveDrawerContext.Consumer>
}
interface IOpenMobileMenuProps {
    context: IResponsiveDrawerContext
}
export const ProcessContextMenu: React.FC<IOpenMobileMenuProps> = (props) => {
    React.useEffect(() => {
        props.context.openMobile(true)
        return () => {
            props.context.openMobile(false)
        };
    }, [props, props.context])
    return <></>
}