import {useReducer, useState} from "react";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography, styled, Divider, ListItemButton,
} from "@mui/material";
import {
    Dashboard,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import KeyIcon from '@mui/icons-material/Key';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import BlockIcon from '@mui/icons-material/Block';
import LockResetIcon from '@mui/icons-material/LockReset';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import PaletteIcon from '@mui/icons-material/Palette';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SpaIcon from '@mui/icons-material/Spa';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {initialSidebarListValues, sidebarReducer} from "../../../reducers/SidebarListReducer";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, selectThemeMode, updateMode} from "../../../state/authSlice";

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: '10px !important',
    padding: '8px 18px',
    margin: '4px 0',
    maxWidth: '95%',
    '&.Mui-selected': {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.dark,
        ':hover, svg': {
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.secondary.dark
        }
    },
    ':hover, :hover div': {
        color: theme.palette.secondary.dark
    },
    ':hover': {
        backgroundColor: theme.palette.secondary.light
    }
}));

const StyledListSubItem = styled(ListItem)(({ theme }) => ({
    paddingLeft: '24px',
    cursor: 'pointer',
    ':hover, :hover div': {
        color: theme.palette.secondary.dark
    }
}));

const StyledListItem = ({ id, text, select, Icon, handleListItemClick, linkTo }) => {

    const selected = select[id].selected;
    return (
        <StyledListItemButton
            component={linkTo ? NavLink : undefined}
            to={linkTo}
            selected={selected}
            onClick={() => handleListItemClick(id)}
        >
            <ListItemIcon sx={{ }} >
                { Icon }
            </ListItemIcon>
            <ListItemText primary={text} primaryTypographyProps={{ variant: 'subtitle2' }} />
        </StyledListItemButton>
    );
};

const MenuList = () => {

    const themeDispatch = useDispatch();

    const user = useSelector(selectCurrentUser);
    const mode = useSelector(selectThemeMode);

    const [select, dispatch] = useReducer(sidebarReducer, initialSidebarListValues);

    const [nestedOpen, setNestedOpen] = useState(false);

    const handleListItemClick = id => {
        dispatch({ type: 'SELECT', id });
    };

    const handleNestedOpen = () => {
        setNestedOpen(!nestedOpen);
    };

    const handleThemeChange = () => {
        themeDispatch(updateMode());
    };

    return (
        <List>
            <ListItemText primary="Scanner" sx={{ my: 2, span: { fontWeight: 600 } }} />

            <StyledListItem id={0} text="Scan product" linkTo="/product/scan" select={select}
                            Icon={<QrCodeScannerIcon />} handleListItemClick={handleListItemClick} />

            <Divider style={{ marginTop: '14px' }} />

            <ListItemText primary="Auth" sx={{ my: 2, span: { fontWeight: 600 } }} />

            <StyledListItemButton
                selected={nestedOpen}
                onClick={handleNestedOpen}
                sx={{
                    pr: 1
                }}
            >
                <ListItemIcon><KeyIcon /></ListItemIcon>
                <ListItemText primary="Authentication" primaryTypographyProps={{ variant: 'subtitle2' }} sx={{ ml: -2 }} />
                <ListItemIcon>
                    { nestedOpen ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
                </ListItemIcon>
            </StyledListItemButton>
            <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
                <List component="div"
                      disablePadding
                      sx={{
                          borderLeft: '.125rem solid',
                          borderColor: 'primary.light',
                          width: .7,
                          m: 'auto',
                          fontSize: 'initial'
                    }}
                >
                    <StyledListSubItem component={NavLink} to="/login">
                        <ListItemIcon sx={{ mr: 1, minWidth: '5px' }}>
                            <>&#9679;</>
                        </ListItemIcon>
                        <ListItemText
                            primary="Login"
                            primaryTypographyProps={{ variant: 'subtitle2' }}
                        />
                    </StyledListSubItem>
                    <StyledListSubItem component={NavLink} to="/register">
                        <ListItemIcon sx={{ mr: 1, minWidth: '5px' }}>
                            <>&#9679;</>
                        </ListItemIcon>
                        <ListItemText
                            primary="Registration"
                            primaryTypographyProps={{ variant: 'subtitle2' }}
                        />
                    </StyledListSubItem>
                </List>
            </Collapse>
            <Divider style={{ marginTop: '14px' }} />
            {
                user && (
                    <>
                        <ListItemText primary="User" sx={{ my: 2, span: { fontWeight: 600 } }} />

                        <StyledListItem id={1} text="Info" linkTo="/user/profile/info" select={select} Icon={<InfoIcon />}
                                        handleListItemClick={handleListItemClick} />
                        <StyledListItem id={2} text="Restrictions" linkTo="/user/profile/restrictions" select={select}
                                        Icon={<BlockIcon />} handleListItemClick={handleListItemClick} />
                        <StyledListItem id={3} text="Change password" linkTo="/user/profile/change-password" select={select}
                                        Icon={<LockResetIcon />} handleListItemClick={handleListItemClick} />
                        <Divider />
                    </>
                )
            }
            <StyledListItemButton onClick={handleThemeChange}>
                <ListItemIcon>
                    { mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon /> }
                </ListItemIcon>
                <ListItemText primary={mode === 'dark' ? 'Light mode' : 'Dark mode'} />
            </StyledListItemButton>
        </List>
    );
}

export default MenuList;