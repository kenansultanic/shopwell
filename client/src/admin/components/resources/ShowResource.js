import {Box, CircularProgress, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {parseResource, timePassed} from "../../../util/utils";
import {useEffect, useState} from "react";
import {deleteResources, getResource} from "../../actions/resources";
import {getRequiredResourceByID} from "../../common/functions";
import Paper from "@mui/material/Paper";
import {getShowResourceSchema} from "../../common/schemas/show-resource-schema";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

const ResourceItem = ({ content, headerName, type, field }) => {

    return (
        <Box
            sx={{ pb: 2 }}
        >
            <Typography variant="subtitle1" color="gray" fontSize="x-small">{ headerName }</Typography>
            {
                type === 'string' ? (
                    <Typography variant="body2" textTransform={field === 'email' ? 'none' : 'capitalise'}>
                        { content }
                    </Typography>
                ) : type === 'bool' ? (
                    <Typography variant="body2">{ content ? 'Yes' : 'No' }</Typography>
                ) : type === 'enum' ? (
                    <Typography variant="body2">{ content }</Typography>
                ) : type === 'multiple-string' ? (
                    <Box display="flex" flexWrap="wrap">
                        { content && content.map(item => <Typography key={item} paragraph>{ item },&nbsp; </Typography>) }
                    </Box>
                ) : type === 'nutritional-value' ? (
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { content && content.map(row => (
                                <TableRow key={row.name}>
                                    <TableCell>{ row.name }</TableCell>
                                    <TableCell>{ row.value }</TableCell>
                                </TableRow>
                            )) }
                        </TableBody>
                    </Table>
                ) : type === 'image' ? (
                    <Box
                        component="img"
                        sx={{
                            width: '90%',
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 250, md: 350 },
                        }}
                        alt={`${field} image`}
                        src={content}
                    />
                ) : undefined
            }
        </Box>
    );
};

const ShowResource = () => {

    const { id, resource } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //const parsedResource = parseResource(resource);
    //const getResource = getRequiredResourceByID(resource);
    const schema = getShowResourceSchema(resource);

    const data = useSelector(state => state.data[resource].find(item => item?._id === id));

    const [isLoading, setIsLoading] = useState(!data);

    const handleEditButtonClick = () => navigate(`/admin/resources/${resource}/edit/${id}`);
    const handleDeleteButtonClick = () => {
        setIsLoading(true);
        dispatch(deleteResources([id], resource))
            .then(() => {
                navigate(`/admin/resources/${resource}/list?page=1`);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error)
            });
    }

    useEffect(() => {

        if (data) return;

        setIsLoading(true);

        dispatch(getResource(id, resource))
            .then(() => setIsLoading(false))
            .catch(error => {
                console.log(error)
            });
    }, []);

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    gap: { xl: 5, md: 3 },
                    my: 3,
                }}
            >
                <Typography variant="h5" textTransform="capitalize">{ resource }</Typography>
                <Box style={{ flexGrow: 1 }}/>
                <Button variant="outlined" style={{ textTransform: 'none' }} onClick={handleEditButtonClick} >
                    <EditIcon fontSize="small" /> &nbsp; Edit
                </Button>
                <Button
                    variant="outlined"
                    color="warning"
                    style={{ textTransform: 'none', marginLeft: '8px' }}
                    onClick={handleDeleteButtonClick}
                >
                    <DeleteIcon fontSize="small" /> &nbsp; Delete
                </Button>
            </Box>
            <Paper elevation={0} sx={{ borderRadius: 1, mt: 5, p: 3, ...{ textAlign: isLoading ? 'center' : undefined } }}>
            {
                isLoading ? <CircularProgress /> :
                    schema && schema.map(({ field, headerName, type }, i) => (
                        <ResourceItem key={i} type={type} headerName={headerName} content={data[field]} field={field} />
                    ))
            }
            </Paper>
        </>
    );
};

export default ShowResource;