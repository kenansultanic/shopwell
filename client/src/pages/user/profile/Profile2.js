import {Box, Grid, Typography} from "@mui/material";
import ToolBar from "./ToolBar";
import {Outlet} from "react-router";

const Profile2 = () => {

    return(
        <Box sx={{ width: '95%', position: 'absolute', top: '60px' }}>
            <Typography variant="h4" sx={{ mx: 3, mb: 3 }}>Profile</Typography>
            <ToolBar />
            <Outlet />
        </Box>
        );
};

export default Profile2;