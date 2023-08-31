import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "../components/dashboard/Chart";
import Privremeno from "../components/dashboard/Privremeno";
import Recent from "../components/dashboard/Recent";

const Dashboard = () => {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Chart />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Privremeno />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Recent />
                </Paper>
            </Grid>
        </Grid>
        );
};

export default Dashboard;