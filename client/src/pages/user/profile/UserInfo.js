import {Box, Typography} from "@mui/material";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../../state/authSlice";

const UserInfoItem = ({ field, text }) => {

    return (
        <Typography
            sx={{
                fontWeight: 'bold',
                padding: '8px',
                fontSize: {
                    sm: 15,
                }
            }}
        >
            { field }:
            <Typography component="span" sx={{ ml: 4 }}>{ text }</Typography>
        </Typography>
    );
}

const UserInfo = () => {

    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);

    return (
        <Box
            sx={{
                display: 'grid',
                justifyItems: 'center',
                bgcolor: 'yellow'
            }}
        >
            <Box style={{ width: '90%' }}>
                <ModeEditOutlineIcon
                    style={{ float: 'right', cursor: 'pointer' }}
                    onClick={() => navigate('/user/profile/update-info')}
                />
            </Box>
            <Box sx={{ mt: 5, bgcolor: 'red' }}>
                <UserInfoItem field="Full name" text={user.firstName.concat(' ', user.lastName)} />
                <UserInfoItem field="E-mail" text={user.email} />
                <UserInfoItem field="E-mail" text="kenansultanić0805@gmail.com" />
                <UserInfoItem field="E-mail" text="kenansultanić0805@gmail.com" />
            </Box>
        </Box>
    );
}

export default UserInfo;