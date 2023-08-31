import {Avatar, Box, ButtonBase, AppBar, Toolbar} from '@mui/material';

import ProfileSection from "./profile/ProfileSection";

import MenuIcon from '@mui/icons-material/Menu';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import SearchIcon from '@mui/icons-material/Search';
import { IconMenu2 } from '@tabler/icons';
import Logo from "../../common/components/Logo";
import Search from "./search/Search";
import {useState} from "react";
import NotificationSection from "./notifications/NotificationSection";

const Header = ({ drawerToggle }) => {

    const [displaySearchInMobile, setDisplaySearchInMobile] = useState(false);

    const toggleDisplaySearch = () => setDisplaySearchInMobile(!displaySearchInMobile);

    return (
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor:'background.default',
                    py: 1
                }}
            >
                <Toolbar>
                    <Box
                        sx={{
                            width: 228,
                            display: 'flex',
                            '@media (max-width: 900px)': {
                                width: 'auto'
                            }
                        }}
                    >
                        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                            <Logo />
                        </Box>
                        <ButtonBase sx={{ overflow: 'hidden', borderRadius: 3,  }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    transition: 'all .2s ease-in-out',
                                    bgcolor: 'secondary.light',
                                    color: 'secondary.dark',
                                    width: '34px',
                                    height: '34px',
                                    margin: .5,
                                    borderRadius: 2.5,
                                    '&:hover': {
                                        bgcolor: 'secondary.dark',
                                        color: 'secondary.light'
                                    }
                                }}
                                onClick={drawerToggle}
                            >
                                <MenuIcon />
                            </Avatar>
                        </ButtonBase>
                        <ButtonBase
                            sx={{
                                overflow: 'hidden',
                                borderRadius: 2.5,
                                display: {
                                    sm: 'inline',
                                    md: 'none'
                                }
                            }}
                        >
                            <Avatar
                                variant="rounded"
                                sx={{
                                    transition: 'all .2s ease-in-out',
                                    bgcolor: 'secondary.light',
                                    color: 'secondary.dark',
                                    width: '34px',
                                    height: '34px',
                                    margin: .5,
                                    borderRadius: 2.5,
                                    '&:hover': {
                                        bgcolor: 'secondary.dark',
                                        color: 'secondary.light'
                                    }
                                }}
                                onClick={toggleDisplaySearch}
                            >
                                <SearchIcon />
                            </Avatar>
                        </ButtonBase>
                    </Box>
                    <Box flexGrow={.3}/>
                    <Search display={displaySearchInMobile} />
                    <Box flexGrow={.7}/>
                    <NotificationSection />
                    <ProfileSection />
                </Toolbar>
            </AppBar>
            // <Box
            //     sx={{
            //         width: '100%',
            //         display: 'flex',
            //         bgcolor: 'red',
            //         padding: 2,
            //         //justifyContent: 'center'
            //     }}
            // >
            //     <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, /*flexGrow: 1*/ }}>
            //
            //     </Box>
            //     <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
            //         <Avatar
            //             variant="rounded"
            //             sx={{
            //                 transition: 'all .2s ease-in-out',
            //                 background: 'palette.secondary.light',
            //                 color: 'palette.secondary.dark',
            //                 '&:hover': {
            //                     background: 'palette.secondary.dark',
            //                     color: 'palette.secondary.light'
            //                 }
            //             }}
            //             onClick={handleLeftDrawerToggle}
            //             color="inherit"
            //         >
            //             <MenuIcon stroke={'1.5'} size="1.3rem" />
            //         </Avatar>
            //     </ButtonBase>
            //
            //
            // </Box>
    );
};

export default Header;
