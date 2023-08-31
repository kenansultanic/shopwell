import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const Privremeno = () => {

    return (
        <>
            <Typography>Recent Deposits</Typography>
            <Typography component="p" variant="h4">
                $3,024.00
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on 15 March, 2019
            </Typography>
            <div>
                <Link color="primary" href="#">
                    View balance
                </Link>
            </div>
        </>
    );
};

export default Privremeno;