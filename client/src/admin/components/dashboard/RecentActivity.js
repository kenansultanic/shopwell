import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {timePassed} from "../../../util/utils";

const RecentActivity = ({ recentActivity }) => {

    return (
        <>
            <Typography>Recent Activity</Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>Action type</TableCell>
                        <TableCell>Collection</TableCell>
                        <TableCell>Document ID</TableCell>
                        <TableCell align="right">ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recentActivity && recentActivity.map(row => (
                        <TableRow key={row._id}>
                            <TableCell>{ timePassed(row.timestampOfAction) }</TableCell>
                            <TableCell>{ row.actionType }</TableCell>
                            <TableCell>{ row.collectionName }</TableCell>
                            <TableCell>{ row.fullDocument?._id }</TableCell>
                            <TableCell align="right">{ row._id }</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default RecentActivity;