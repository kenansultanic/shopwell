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
import DashboardIcon from "@mui/icons-material/Dashboard";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {NavLink} from "react-router-dom";
import {ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import {useRef, useState} from "react";
import {Outlet} from "react-router";
import Button from "@mui/material/Button";

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
            <StyledListItemButton component={NavLink} to="/admin">
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
            </StyledListItemButton>
            <ListSubheader component="div" inset style={{ ...(isOpen && { paddingLeft: '12px' }) }}>
                Resources
            </ListSubheader>
            <StyledListItemButton>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Users"/>
            </StyledListItemButton>
            <StyledListItemButton>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Products"/>
            </StyledListItemButton>
            <StyledListItemButton>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Restrictions"/>
                {/*<ListItemIcon sx={{ 'svg': { ml: 2 } }}>*/}
                {/*    { isOpen ? <ExpandLessIcon/> : <ExpandMoreIcon/> }*/}
                {/*</ListItemIcon>*/}
            </StyledListItemButton>
            {/*<Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ width: '80%', margin: 'auto' }}>
                    <StyledListItemButton>
                        <ListItemIcon sx={{ mr: 1, minWidth: '5px' }}>
                            <>&#9679;</>
                        </ListItemIcon>
                        <ListItemText primary="Allergies"/>
                    </StyledListItemButton>
                    <StyledListItemButton>
                        <ListItemIcon sx={{ mr: 1, minWidth: '5px '}}>
                            <>&#9679;</>
                        </ListItemIcon>
                        <ListItemText primary="Religious"/>
                    </StyledListItemButton>
                    <StyledListItemButton>
                        <ListItemIcon sx={{ mr: 1, minWidth: '5px' }}>
                            <>&#9679;</>
                        </ListItemIcon>
                        <ListItemText primary="Intolerances"/>
                    </StyledListItemButton>
                </List>
            </Collapse>*/}
            <StyledListItemButton>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Product reviews"/>
            </StyledListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListSubheader component="div" inset style={{ ...(isOpen && { paddingLeft: '12px' }) }}>
                Saved reports
            </ListSubheader>
            <StyledListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Current month" />
            </StyledListItemButton>
            <StyledListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Last quarter" />
            </StyledListItemButton>
            <StyledListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Year-end sale" />
            </StyledListItemButton>
        </>
    );
};

export const secondaryListItems = (
    <>
        <ListSubheader component="div" inset >
            Saved reports
        </ListSubheader>
        <StyledListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </StyledListItemButton>
        <StyledListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </StyledListItemButton>
        <StyledListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </StyledListItemButton>
    </>
);

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

    const [open, setOpen] = useState(true);
    const [mode, setMode] = useState('light')


    const toggleDrawer = () => setOpen(!open);

    const toggleMode = () => setMode(mode === 'light' ? 'dark' : 'light');

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                        //backgroundColor: 'white'
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
                        {/*<Badge badgeContent={4} color="secondary">*/}
                        {/*    <NotificationsIcon />*/}
                        {/*</Badge>*/}
                        {
                            mode === 'light'
                                ? <LightModeIcon color="inherit" />
                                : <DarkModeIcon color="inherit" />
                        }
                    </IconButton>
                    <ButtonBase aria-label="log out" onClick={()=>{console.log(2)}}>Log out</ButtonBase>
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
