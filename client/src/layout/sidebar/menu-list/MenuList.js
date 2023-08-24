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

import KeyIcon from '@mui/icons-material/Key';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import PaletteIcon from '@mui/icons-material/Palette';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SpaIcon from '@mui/icons-material/Spa';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {initialSidebarListValues, sidebarReducer} from "../../../reducers/SidebarListReducer";

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: '10px !important',
    padding: '8px 18px',
    margin: '4px 0',
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

const StyledListItem = ({ id, text, select, Icon, handleListItemClick }) => {

    const selected = select[id].selected;
    return (
        <StyledListItemButton selected={selected} onClick={() => handleListItemClick(id)}>
            <ListItemIcon sx={{ }} >
                { Icon }
            </ListItemIcon>
            <ListItemText primary={text} primaryTypographyProps={{ variant: 'subtitle2' }} />
        </StyledListItemButton>
    );
};

const MenuList = () => {

    const [select, dispatch] = useReducer(sidebarReducer, initialSidebarListValues);

    const [nestedOpen, setNestedOpen] = useState(false);

    const handleListItemClick = id => {
        dispatch({ type: 'SELECT', id });
    };

    const handleNestedOpen = () => {
        setNestedOpen(!nestedOpen);
    };

    return (
        <List>
            <ListItemText primary="Dashboard" sx={{ my: 2, span: { fontWeight: 600 } }} />
            {/*<StyledListItem*/}
            {/*    button selected={select[0].selected}*/}
            {/*    onClick={() => handleListItemClick(0)}*/}
            {/*>*/}
            {/*    <ListItemIcon sx={{ color: 'secondary.dark'}}><DashboardIcon /></ListItemIcon>*/}
            {/*    <ListItemText primary="Dashboard" />*/}
            {/*</StyledListItem>*/}

            <StyledListItem id={0} text="Dashboard" select={select}
                             Icon={<Dashboard />} handleListItemClick={handleListItemClick} />

            <StyledListItem id={1} text="Dashboard" select={select}
                             Icon={<Dashboard />} handleListItemClick={handleListItemClick} />

            <Divider style={{ marginTop: '14px' }} />

            <ListItemText primary="Dashboard" sx={{ my: 2, span: { fontWeight: 600 } }} />

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
                          m: 'auto'
                    }}
                >
                    <StyledListSubItem>
                        <ListItemIcon sx={{ mr: 1, minWidth: '5px' }}>
                            <>&#9679;</>
                        </ListItemIcon>
                        <ListItemText
                            primary="Login"
                            primaryTypographyProps={{ variant: 'subtitle2' }}
                        />
                    </StyledListSubItem>
                    <StyledListSubItem>
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

            <ListItemText primary="Dashboard" sx={{ my: 2, span: { fontWeight: 600 } }} />

            <StyledListItemButton>
                <ListItemIcon><FormatBoldIcon /></ListItemIcon>
                <ListItemText primary="Item 1" />
            </StyledListItemButton>
            <StyledListItemButton>
                <ListItemIcon><PaletteIcon /></ListItemIcon>
                <ListItemText primary="Item 2" />
            </StyledListItemButton>
            <StyledListItemButton>
                <ListItemIcon><AddCircleOutlineIcon /></ListItemIcon>
                <ListItemText primary="Item 3" />
            </StyledListItemButton>
            <StyledListItemButton>
                <ListItemIcon><SpaIcon /></ListItemIcon>
                <ListItemText primary="Item 4" />
            </StyledListItemButton>
            <Divider />
            <StyledListItemButton>
                <ListItemIcon><DarkModeIcon /></ListItemIcon>
                <ListItemText primary="Night mode" />
            </StyledListItemButton>
        </List>
        // <List>
        //     <ListItem button onClick={handleOpen}>
        //         <ListItemIcon>{/!* Add your icon here *!/}</ListItemIcon>
        //         <ListItemText primary="ProfileMenu Item 1" />
        //         {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        //     </ListItem>
        //     <Collapse in={open} timeout="auto" unmountOnExit>
        //         <List component="div" disablePadding>
        //             <ListItem button sx={{ pl: 4 }} onClick={handleNestedOpen}>
        //                 <ListItemIcon>{/!* Add your icon here *!/}</ListItemIcon>
        //                 <ListItemText primary="Submenu Item 1" />
        //                 {nestedOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        //             </ListItem>
        //             <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
        //                 <List component="div" disablePadding>
        //                     <ListItem button sx={{ pl: 4 }}>
        //                         <ListItemIcon>{/!* Add your icon here *!/}</ListItemIcon>
        //                         <ListItemText primary="Submenu Item 1-1" />
        //                     </ListItem>
        //                     <ListItem button sx={{ pl: 4 }}>
        //                         <ListItemIcon>{/!* Add your icon here *!/}</ListItemIcon>
        //                         <ListItemText primary="Submenu Item 1-2" />
        //                     </ListItem>
        //                 </List>
        //             </Collapse>
        //             <ListItem button sx={{ pl: 4 }}>
        //                 <ListItemIcon>{/!* Add your icon here *!/}</ListItemIcon>
        //                 <ListItemText primary="Submenu Item 2" />
        //             </ListItem>
        //         </List>
        //     </Collapse>
        //     <ListItem button>
        //         <ListItemIcon>{/!* Add your icon here *!/}</ListItemIcon>
        //         <ListItemText primary="ProfileMenu Item 2" />
        //     </ListItem>
        //     <ListItem button>
        //         <ListItemIcon>{/!* Add your icon here *!/}</ListItemIcon>
        //         <ListItemText primary="ProfileMenu Item 3" />
        //     </ListItem>
        // </List>
    );
}

export default MenuList;