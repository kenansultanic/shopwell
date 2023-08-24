import { Avatar, Box, ButtonBase, styled, Typography} from "@mui/material";
import Logo from "../../../common/components/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileSection from "../../../layout/header/profile/ProfileSection";
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";

const StyledButton = styled(Button)(({ theme }) => ({
    color: 'inherit',
    textTransform: 'none',
    fontSize: '1rem',
    '& .MuiTypography-root': {
        paddingBottom: '4px'
    },
    '&.active': {
        '& .MuiTypography-root': {
            borderBottom: '2px solid',
            color: theme.palette.secondary.dark,
            borderColor: theme.palette.secondary.dark,
        }
    },
    '&.MuiButtonBase-root:hover': {
        backgroundColor: 'transparent',
        color: theme.palette.secondary.dark,
        '& .MuiTypography-root': {
            borderBottom: '2px solid',
            borderColor: theme.palette.secondary.dark
        }
    },
    '@media (max-width: 650px)': {
        fontSize: '.8rem'
    },
    '@media (max-width: 400px)': {
        fontSize: '.6rem'
    }
}));

const ToolBar = () => {

    return (
        <Box sx={{ mx: 2 }}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    '@media (max-width: 900px)': {
                        width: 'auto'
                    }
                }}
            >
                <StyledButton component={NavLink} to="/user/profile/info">
                    <Typography>Personal info</Typography>
                </StyledButton>
                <StyledButton component={NavLink} to="/user/profile/restrictions">
                    <Typography>Restrictions & Preferences</Typography>
                </StyledButton>
                <StyledButton component={NavLink} to="/user/profile/change-password">
                    <Typography>Change password</Typography>
                </StyledButton>
                <Box style={{ flexGrow: 1 }} />
            </Box>
        </Box>
    );
}

export default ToolBar;