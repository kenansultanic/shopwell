import Header from "../../layout/header/Header";
import Sidebar from "../../layout/sidebar/Sidebar";
import {useState} from "react";
import {Outlet} from 'react-router'
import {Box} from "@mui/material";
import Paper from "@mui/material/Paper";

const Main = () => {

    const [drawerOpen, setDrawerOpen] = useState(true);
    const drawerToggle = () => setDrawerOpen(!drawerOpen);

    return (
        <>
            <Header drawerToggle={drawerToggle} />
            <Sidebar drawerOpen={drawerOpen} drawerToggle={drawerToggle} />
            <Box
                sx={{
                    position: 'relative',
                    top: '54px',
                    left: drawerOpen ? '270px' : 0,
                    width: drawerOpen ? 'calc(100vw - 270px)' : '100%',
                    height: 'calc(100vh - 56px)',
                    px: 2,
                    pt: 4,
                    transition: 'width .3s',
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        width: '100%',
                        minHeight: '100%',
                        borderRadius: '16px 16px 0 0',
                        bgcolor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Outlet />
                </Paper>
            </Box>
        </>
    );
}

export default Main;