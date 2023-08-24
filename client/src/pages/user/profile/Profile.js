import TextField from "@mui/material/TextField";
import {Box, Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Slide, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import PerfectScrollbar from "react-perfect-scrollbar";
import MAvatar from "../../../common/components/Avatar";
import {useState} from "react";
import List from "@mui/material/List";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NoFoodIcon from '@mui/icons-material/NoFood';
import {Outlet} from "react-router";

const Profile = () => {

    const User1 = 'https://img.wattpad.com/5390d02ab7a59787d852a2ca148d995af7c22d55/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f483072707742414a724e446378773d3d2d3835393034373435352e313630316631363536353932646132373134383638313630313037362e6a7067?s=fit&w=720&h=720';

    const [selectNewAvatar, setSelectNewAvatar] = useState(false);

    const toggleSaveAvatar = () => setSelectNewAvatar(prev => !prev);

    const t = (
        <Avatar
        src={User1}
        sx={{
            height: 120,
            width: 120,
            mx: 'auto',
            mb: .5
        }}
    />)

    return (
      <Grid container justifyContent="center" sx={{ minHeight: '100%', position: 'relative' }}>
        <Grid
            item
            xs={12}
            sm={8}
            md={6}
            sx={{
                bgcolor: 'secondary.light',
                borderRadius: '16px 16px 0 0',
                //display: 'flex',
                //flexDirection: 'column',
                mt: 1,
                minHeight: '84vh',
                overflow: 'hidden'
            }}>
            <Box sx={{ mb: 1, mt: 4, overflow: 'hidden' }}>
                {
                    !selectNewAvatar?
                        (
                            <>
                                <Slide direction="left" timeout={700} in={!selectNewAvatar} unmountOnExit>
                                    <Box sx={{
                                        height: 120,
                                        width: 120,
                                        borderRadius: '50%',
                                        m: 'auto',
                                        position: 'relative',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        '&:hover button': {
                                            opacity: '1 !important'
                                        }
                                    }}>
                                    <Avatar
                                            src={User1}
                                            sx={{
                                                height: 120,
                                                width: 120,
                                                mx: 'auto',
                                                mb: .5,
                                                cursor: 'pointer',
                                                position: 'absolute',
                                                top: 0,
                                            }}
                                    />
                                        <Button style={{ opacity: 0, transition: 'opacity .4s ease' }}>test</Button>
                                    </Box>
                                </Slide>
                                <Button size="small" sx={{ float: 'right' }} onClick={() => toggleSaveAvatar()}>
                                    Change avatar
                                </Button>
                            </>
                        ) : (
                            <>
                                <Slide direction="left" timeout={700} in={selectNewAvatar} mountOnEnter unmountOnExit>
                                    <Box>
                                    <PerfectScrollbar
                                        component="div"
                                        style={{
                                            display: 'flex',
                                            padding: '4px',
                                            height: 'auto'
                                        }}
                                    >
                                        <MAvatar src={User1} dim={100} selected />
                                        <MAvatar src={User1} dim={100} selected />
                                        <MAvatar src={User1} dim={100} />
                                        <MAvatar src={User1} dim={100} />
                                        <MAvatar src={User1} dim={100} />
                                        <MAvatar src={User1} dim={100} />
                                    </PerfectScrollbar>
                                    </Box>
                                </Slide>
                                <Button size="small" sx={{ float: 'right' }} onClick={() => toggleSaveAvatar()}>
                                    Save change
                                </Button>
                            </>
                        )
                }
                {/*{t}*/}
                {/*<Button sx={{ float: 'right' }}>Change avatar</Button>*/}
            </Box>
            <Outlet />

        </Grid>
      </Grid>
    );
}

export default Profile;