import {Box, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {parseResource} from "../../../util/utils";
import {useEffect, useState} from "react";
import {getResource} from "../../../actions/resources";
import {getRequiredResourceByID} from "../../common/functions";
import Paper from "@mui/material/Paper";
import {getShowResourceSchema} from "../../common/schemas/show-resource-schema";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ResourceItem = ({ content, headerName, type }) => {

    return (
        <Box
            sx={{ pb: 2 }}
        >
            <Typography variant="subtitle1" color="gray" fontSize="x-small">{ headerName }</Typography>
            {
                type === 'string' ? (
                    <Typography variant="body2" textTransform="capitalize">{ content }</Typography>
                ) : type === 'bool' ? (
                    <Typography variant="body2">{ content ? 'Yes' : 'No' }</Typography>
                ) : type === 'enum' ? (
                    <Typography variant="body2">{ content }</Typography>
                ) : (
                    <></>
                )
            }
        </Box>
    );
};

const ShowResource = () => {

    const { id, resource } = useParams();
    const dispatch = useDispatch();

    const parsedResource = parseResource(resource);
    //const getResource = getRequiredResourceByID(resource);
    const schema = getShowResourceSchema(resource);

    const data = useSelector(state => state.data[parsedResource].find(item => item?._id === id));

    const [isLoading, setIsLoading] = useState(!data);

    useEffect(() => {

        if (data) return;

        setIsLoading(true);

        dispatch(getResource(id, resource))
            .then(() => setIsLoading(false))
            .catch(error => {
                console.log(error)
            })
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
                <Button variant="outlined" style={{ textTransform: 'none' }}>
                    <EditIcon fontSize="small" /> &nbsp; Update
                </Button>
                <Button variant="outlined" color="warning" style={{ textTransform: 'none' }}>
                    <DeleteIcon fontSize="small" /> &nbsp; Delete
                </Button>
            </Box>
            <Paper elevation={0} sx={{ borderRadius: 1, mt: 5, p: 3 }}>
            {
                isLoading ? <p>liading</p> :
                    schema.map(({ field, headerName, type }, i) => (
                        <ResourceItem key={i} type={type} headerName={headerName} content={data[field]} />
                    ))
            }
            </Paper>
        </>
    );
};

export default ShowResource;