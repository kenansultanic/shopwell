import Paper from "@mui/material/Paper";
import {useFormik} from "formik";
import {getValidationSchema} from "../../common/schemas/formik-schema";
import {useParams} from "react-router";
import {getNewResourceSchema} from "../../common/schemas/new-resource-schema";
import StyledTextField from "../common/StyledTextField";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {Box, CircularProgress, MenuItem, Typography} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import {useEffect, useState} from "react";
import HandleResource from "./HandleResource";
import {editResource, getResource} from "../../actions/resources";
import {useDispatch, useSelector} from "react-redux";
import {copyObject, parseResource} from "../../../util/utils";
import {getRequiredResourceByID} from "../../common/functions";
const EditResource = () => {

    const { resource, id } = useParams();

    const dispatch = useDispatch();

    const [validationSchema] = getValidationSchema(resource === 'products' ? 'products-edit' : resource);
    const newResourceSchema = getNewResourceSchema(resource);

    const initialValues = copyObject(useSelector(state => state.data[resource].find(item => item?._id === id)));

    if (resource === 'products') {
        const init = initialValues.nutritionalValuePer100grams;
        initialValues.nutritionalValuePer100grams = init.map(item => `${item.name} ${item.value}`);
    }

    const [isLoading, setIsLoading] = useState(!initialValues);

    useEffect(() => {

        if (initialValues) return;

        setIsLoading(true);

        dispatch(getResource(id))
            //.then(() => setIsLoading(false))
            .catch(error => {
                if (error.status === 422)
                    console.log('napravi error handler', error.data.message)
                console.log(error)
            })
            .finally(() => setIsLoading(false))
    }, []);


    return (
        ['products', 'restrictions'].includes(resource) ?
        <>
            { isLoading ? <CircularProgress /> : (
                    initialValues ?
                        <HandleResource
                            validationSchema={validationSchema}
                            resourceSchema={newResourceSchema}
                            initialValues={initialValues}
                            dispatchCall={editResource}
                        />
                        : (
                            <Box display="flex" justifyContent="center">
                                <Typography>No such resource exists</Typography>
                            </Box>
                        )
            ) }
        </> : <Box display="flex" justifyContent="center"><Typography>You cant edit selected resource</Typography></Box>
    );
};

export default EditResource;