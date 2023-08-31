import Avatar from "@mui/material/Avatar";
import {
    Box,
    ButtonBase, Card,
    CardActions, CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText,
    Popper,
    Stack,
    Typography
} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import Transitions from "../../../common/transitions/Transitions";
import PerfectScrollbar from "react-perfect-scrollbar";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {IconBell, IconPhoto} from "@tabler/icons";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
import List from "@mui/material/List";
import NotificationsIcon from '@mui/icons-material/Notifications';
import {io} from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import {appendNotifications, deleteNotifications, selectNotifications} from "../../../state/authSlice";
import {timePassed} from "../../../util/utils";
import Badge from "@mui/material/Badge";

const socket = io.connect('http://localhost:4000');

const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 16,
    '&:hover': {
        background: theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

const NotificationSection = () => {

    const notifications = useSelector(selectNotifications);
    const dispatch = useDispatch();

    const anchorRef = useRef(null);
    const renderAfterCalled = useRef(false);

    const [open, setOpen] = useState(false);
    const [unseenNotifications, setUnseenNotifications] = useState(0);

    const handleClose = () => setOpen(false);
    const handleToggle = () => {
        setOpen(!open);
        setUnseenNotifications(0);
    }

    useEffect(() => {

        if (renderAfterCalled) {
            renderAfterCalled.current = false;
        }
        socket.on('receive_notification', data => {
            dispatch(appendNotifications({ ...data }));

            if (!open)
                setUnseenNotifications(prevState => prevState + 1);
            renderAfterCalled.current = true;
        });

    }, [socket]);

    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    mr: 2.5
                }}
            >
                <Badge badgeContent={unseenNotifications} max={99} color="error">
                <ButtonBase sx={{ borderRadius: 2.5 }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            transition: 'all .2s ease-in-out',
                            bgcolor: 'secondary.light',
                            color: 'secondary.dark',
                            borderRadius: 2.5,
                            width: '34px',
                            height: '34px',
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                bgcolor: 'secondary.dark',
                                color: 'secondary.light'
                            }
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <NotificationsIcon />
                    </Avatar>
                </ButtonBase>
                </Badge>
            </Box>
            <Popper
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
                                offset: [5, 20]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper sx={{ mr: 2.5, mt: 1, minWidth: '300px' }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <Paper elevation={16}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }}>
                                                <Grid item>
                                                    <Stack direction="row" spacing={2}>
                                                        <Typography variant="subtitle1">All Notification</Typography>
                                                        <Chip
                                                            size="small"
                                                            label={notifications.length > 99 ? '99+' : notifications.length}
                                                            sx={{
                                                                color: 'background.default',
                                                                bgcolor: 'error.dark'
                                                            }}
                                                        />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <PerfectScrollbar
                                                style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}
                                            >
                                                <List
                                                    sx={{
                                                        width: '100%',
                                                        maxWidth: {
                                                            lg: 330,
                                                            md: 300
                                                        },
                                                        py: 0,
                                                        borderRadius: '10px',
                                                        '& .MuiListItemSecondaryAction-root': {
                                                            top: 22
                                                        },
                                                        '& .MuiDivider-root': {
                                                            my: 0
                                                        },
                                                        '& .list-container': {
                                                            pl: 7
                                                        }
                                                    }}
                                                >
                                                {
                                                    notifications.length === 0 ? (
                                                        <ListItemWrapper>
                                                            <ListItem alignItems="center">
                                                                <ListItemText primary={
                                                                    <Typography variant="subtitle1">
                                                                        You have no notifications
                                                                </Typography>
                                                                } />
                                                            </ListItem>
                                                        </ListItemWrapper>
                                                    ) : (
                                                        notifications.map(({ tag, content, createdAt, _id }) => (
                                                            <Box key={_id}>
                                                            <ListItemWrapper>
                                                                <ListItem alignItems="center">
                                                                    <ListItemAvatar>
                                                                        <Avatar alt="Admin" />
                                                                    </ListItemAvatar>
                                                                    <ListItemText primary={
                                                                        <Typography variant="subtitle1">
                                                                            Administrator
                                                                        </Typography>
                                                                    } />
                                                                    <ListItemSecondaryAction>
                                                                        <Grid container justifyContent="flex-end">
                                                                            <Grid item xs={12}>
                                                                                <Typography variant="caption" display="block" gutterBottom>
                                                                                    { timePassed(new Date(createdAt)) }
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </ListItemSecondaryAction>
                                                                </ListItem>
                                                                <Grid container direction="column" className="list-container">
                                                                    <Grid item xs={12} sx={{ pb: 2 }}>
                                                                        <Typography variant="subtitle2">
                                                                            { content }
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </ListItemWrapper>
                                                            <Divider />
                                                            </Box>
                                                        ))
                                                    )
                                                }
                                                </List>
                                            </PerfectScrollbar>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                                        <Button
                                            size="small"
                                            disableElevation
                                            style={{ textTransform: 'none' }}
                                            onClick={() => dispatch(deleteNotifications())}
                                        >
                                            Delete all
                                        </Button>
                                    </CardActions>
                                </Paper>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default NotificationSection;