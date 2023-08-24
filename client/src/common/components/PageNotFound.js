import {Box, Typography} from "@mui/material";

const PageNotFound = () => {

    return (
        <Box
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Typography variant="h1">404</Typography>
            <Typography variant="h4">Page not found</Typography>
        </Box>
    );
};

export default PageNotFound;