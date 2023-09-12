import Box from "@mui/material/Box";
import {Drawer, useMediaQuery} from "@mui/material";

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';
import {useTheme} from "@mui/material/styles";
import MenuList from "./menu-list/MenuList";
import Logo from "../../common/components/Logo";


const Sidebar = ({ drawerOpen, drawerToggle }) => {

    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box component="nav"
             sx={{
                 flexShrink: { md: 0 },
                 width: matchUpMd ? 250 : 'auto',
             }}
             aria-label="sidebar">
            <Drawer
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                onClose={drawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 250,
                        background: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                        [theme.breakpoints.up('md')]: {
                            top: '88px'
                        }
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <Box sx={{ display: 'flex', p: 2 }}>
                        <Logo />
                    </Box>
                </Box>
                <BrowserView>
                    <PerfectScrollbar
                        component="div"
                        style={{
                            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                            paddingLeft: '16px',
                            paddingRight: '16px'
                        }}
                    >
                        <MenuList />
+                    </PerfectScrollbar>
                </BrowserView>
                <MobileView>
                    <Box sx={{ px: 2 }}>
                        <MenuList />
                    </Box>
                </MobileView>
            </Drawer>
        </Box>
    );
}

export default Sidebar;