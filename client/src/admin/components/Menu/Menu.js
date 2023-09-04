import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
    ButtonBase,
    Chip,
    ClickAwayListener,
    Collapse,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Popper
} from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import BlockIcon from '@mui/icons-material/Block';
import ReviewsIcon from '@mui/icons-material/Reviews';
import EmailIcon from '@mui/icons-material/Email';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import {NavLink} from "react-router-dom";
import {ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import {useRef, useState} from "react";
import {Outlet} from "react-router";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectThemeMode, updateMode} from "../../../state/authSlice";

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    '&.active, :hover': {
        color: theme.palette.primary.dark,
        '& .MuiListItemIcon-root': {
            color: 'inherit',
        }
    }
}));

const StyledListSubheader = styled(ListSubheader)(() => ({
    paddingLeft: '12px'
}));

const MainListItems = ({ isOpen }) => {

    //const [isOpen, setIsOpen] = useState(false);

    //const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <>
            <StyledListItemButton component={NavLink} to="/admin/dashboard">
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </StyledListItemButton>
            <ListSubheader component="div" inset style={{ ...(isOpen && { paddingLeft: '12px' }) }}>
                Resources
            </ListSubheader>
            <StyledListItemButton component={NavLink} to="/admin/resources/users/list?page=1">
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </StyledListItemButton>
            <StyledListItemButton component={NavLink} to="/admin/resources/products/list?page=1">
                <ListItemIcon>
                    <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
            </StyledListItemButton>
            <StyledListItemButton component={NavLink} to="/admin/resources/restrictions/list?page=1">
                <ListItemIcon>
                    <BlockIcon />
                </ListItemIcon>
                <ListItemText primary="Restrictions" />
            </StyledListItemButton>
            <StyledListItemButton component={NavLink} to="/admin/resources/product-reviews/list?page=1">
                <ListItemIcon>
                    <ReviewsIcon />
                </ListItemIcon>
                <ListItemText primary="Product reviews" />
            </StyledListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListSubheader component="div" inset style={{ ...(isOpen && { paddingLeft: '12px' }) }}>
                Pages
            </ListSubheader>
            <StyledListItemButton component={NavLink} to="/admin/promotional-email">
                <ListItemIcon>
                    <EmailIcon />
                </ListItemIcon>
                <ListItemText primary="Send emails" />
            </StyledListItemButton>
            <StyledListItemButton component={NavLink} to="/admin/send-notification">
                <ListItemIcon>
                    <NotificationAddIcon />
                </ListItemIcon>
                <ListItemText primary="Send notification" />
            </StyledListItemButton>
        </>
    );
};

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const Menu = () => {

    const mode = useSelector(selectThemeMode);
    const dispatch = useDispatch();

    const toggleMode = () => dispatch(updateMode());
    const [open, setOpen] = useState(true);

    const toggleDrawer = () => setOpen(!open);


    return (
        <Box display="flex" fontSize="1.5rem">
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px',
                    }}
                >
                    <IconButton
                        edge="start"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            color: 'common.white',
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Admin
                    </Typography>
                    <IconButton sx={{ color: 'common.white', mx: 2 }} onClick={toggleMode}>
                        {
                            mode === 'light'
                                ? <LightModeIcon color="inherit" />
                                : <DarkModeIcon color="inherit" />
                        }
                    </IconButton>
                    <ButtonBase aria-label="log out" onClick={() => dispatch(logout())}>
                        Log out
                    </ButtonBase>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer} sx={{ '&:hover': { color: 'primary.dark' } }}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    <MainListItems isOpen={open} />
                    <Divider sx={{ my: 1 }} />
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    minHeight: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
};

export default Menu;
