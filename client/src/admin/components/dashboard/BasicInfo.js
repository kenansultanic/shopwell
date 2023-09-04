import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const BasicInfo = ({ numberOfUsers, numberOfProducts }) => {

    return (
        <>
            <Typography>Total number of products</Typography>
            <Typography component="p" variant="h4">
                { numberOfProducts }
            </Typography>
            <Typography marginTop={1.5}>Total number of users</Typography>
            <Typography component="p" variant="h4" style={{ flex: 1 }}>
                { numberOfUsers }
            </Typography>
            <Typography color="text.secondary">
                as of { new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }
            </Typography>
        </>
    );
};

export default BasicInfo;