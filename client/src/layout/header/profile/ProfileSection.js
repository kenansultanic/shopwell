

import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import PerfectScrollbar from 'react-perfect-scrollbar';
import Avatar from "@mui/material/Avatar";
import {
    Card,
    CardContent,
    Chip, ClickAwayListener,
    Divider, InputAdornment, ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, OutlinedInput,
    Popper, Stack,
    Switch
} from "@mui/material";
import {useRef, useState} from "react";
import {IconLogout, IconSearch, IconSettings, IconUser, IconQuestionMark} from "@tabler/icons";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List'
import Grid from "@mui/material/Grid";
import { useTheme } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Transitions from "../../../common/transitions/Transitions";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectCurrentUser, selectThemeMode, setError, updateMode} from "../../../state/authSlice";
import {useNavigate} from "react-router";
import {updateAllowExtraEmails} from "../../../actions/users";

const defaultUser = 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg';

const ProfileSection = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(selectCurrentUser);
    const theme = useSelector(selectThemeMode);

    const [open, setOpen] = useState(false);

    const anchorRef = useRef(null);

    const handleToggle = () => setOpen(!open);

    const handleClose = () => setOpen(false);

    const setThemeMode = checked => {
        dispatch(updateMode());
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/product/scan');
    };

    const toggleAllowExtraEmails = checked => {
        dispatch(updateAllowExtraEmails(checked, user._id))
            .then(response => {
            })
            .catch(error => {
                dispatch(setError({ error: error.message ?? 'An error occurred' }));
            });
    };

    return (
        <>
            <Chip
                sx={{
                    height: '48px !important',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: 'primary.light',
                    bgcolor: 'primary.light',
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'primary.main',
                        color: 'primary.light',
                        '& svg': {
                            stroke: 'primary.light'
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={user?.picture ? user.picture : defaultUser}
                        sx={{
                            mx: '8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={<SettingsIcon sx={{ color: 'primary.dark' }} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <CardContent elevation={16}>
                                    <Box sx={{ p: 2 }}>
                                        <Stack>
                                            <Stack
                                                direction="row"
                                                spacing={.5}
                                                alignItems="center"
                                            >
                                                <Typography variant="h4">Hello,&nbsp; </Typography>
                                                <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                                    { user ? `${user.firstName} ${user.lastName}` : 'user' }
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Divider />
                                    </Box>
                                        <Box sx={{ p: 2 }}>
                                            <Card
                                                sx={{
                                                    bgcolor: 'primary.light',
                                                    my: 1,

                                                }}
                                            >
                                                <Grid
                                                    container
                                                    spacing={3}
                                                    direction="column"
                                                    sx={{
                                                        p: 1,
                                                        bgcolor: 'primary.light'
                                                    }}
                                                >
                                                    <Grid item>
                                                        <Grid item container alignItems="center" justifyContent="space-between">
                                                            <Grid item>
                                                                <Typography variant="subtitle1">
                                                                    Dark mode
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Switch
                                                                    color="primary"
                                                                    checked={theme === 'dark'}
                                                                    onChange={e => setThemeMode(e.target.checked)}
                                                                    name="sdm"
                                                                    size="small"
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {
                                                        user && (
                                                            <Grid item>
                                                                <Grid item container alignItems="center" justifyContent="space-between">
                                                                    <Grid item>
                                                                        <Typography variant="subtitle1">Allow extra emails</Typography>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Switch
                                                                            checked={user.allowExtraEmails}
                                                                            onChange={e => toggleAllowExtraEmails(e.target.checked)}
                                                                            name="sdm"
                                                                            size="small"
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        )
                                                    }
                                                </Grid>
                                            </Card>
                                            <Divider />
                                            <List
                                                component="nav"
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 350,
                                                    minWidth: 300,
                                                    backgroundColor: 'background.paper',
                                                    borderRadius: '10px',
                                                    /*[theme.breakpoints.down('md')]: {
                                                        minWidth: '100%'
                                                    },*/
                                                    '& .MuiListItemButton-root': {
                                                        mt: 0.5
                                                    }
                                                }}
                                            >
                                                {/*<ListItemButton
                                                sx={{ borderRadius: `5px` }}
                                                selected={selectedIndex === 0}
                                                onClick={(event) => handleListItemClick(event, 0, '/user/account-profile/profile1')}
                                            >
                                                <ListItemIcon>
                                                    <IconSettings stroke={1.5} size="1.3rem" />
                                                </ListItemIcon>
                                                <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                                            </ListItemButton>
                                            <ListItemButton
                                                sx={{ borderRadius: `5px` }}
                                                onClick={(event) => handleListItemClick(event, 1, '/user/social-profile/posts')}
                                            >
                                                <ListItemIcon>
                                                    <IconQuestionMark stroke={1.5} size="1.3rem" />
                                                </ListItemIcon>
                                                <ListItemText  primary={<Typography variant="body2">About</Typography>} />
                                            </ListItemButton>*/}
                                            {
                                                user ? (
                                                    <ListItemButton
                                                        sx={{ borderRadius: `5px` }}
                                                        //selected={selectedIndex === 4}
                                                        onClick={handleLogout}
                                                    >
                                                        <ListItemIcon>
                                                            <IconLogout stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                                    </ListItemButton>
                                                ) : (
                                                    <ListItemButton
                                                        sx={{ borderRadius: `5px` }}
                                                        onClick={() => navigate('/login')}
                                                    >
                                                        <ListItemIcon>
                                                            <IconLogout stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Login</Typography>} />
                                                    </ListItemButton>
                                                )
                                            }
                                        </List>
                                        </Box>
                                </CardContent>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;