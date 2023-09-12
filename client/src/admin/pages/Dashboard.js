import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "../components/dashboard/Chart";
import BasicInfo from "../components/dashboard/BasicInfo";
import RecentActivity from "../components/dashboard/RecentActivity";
import {useDispatch, useSelector} from "react-redux";
import {selectStatistics} from "../../state/dataSlice";
import {useEffect} from "react";
import {getStatistics} from "../actions/resources";

const Dashboard = () => {

    const statistics = useSelector(selectStatistics);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!statistics)
            dispatch(getStatistics())
                .then(response => {})
                .catch(error => {
                    // todo error handler
                })
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                        fontSize: '2.25rem'
                    }}
                >
                    <Chart scansPerDay={statistics?.scansPerDay} />
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
                    <BasicInfo
                        numberOfUsers={statistics?.numberOfUsers}
                        numberOfProducts={statistics?.numberOfProducts}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                    <RecentActivity recentActivity={statistics?.recentActivity} />
                </Paper>
            </Grid>
        </Grid>
        );
};

export default Dashboard;