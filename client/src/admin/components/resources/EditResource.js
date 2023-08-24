import Paper from "@mui/material/Paper";
import {useFormik} from "formik";
import {getValidationSchema} from "../../common/schemas/formik-schema";
import {useParams} from "react-router";
import {getNewResourceSchema} from "../../common/schemas/new-resource-schema";
import StyledTextField from "../common/StyledTextField";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {CircularProgress, MenuItem} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import {useEffect, useState} from "react";
import HandleResource from "./HandleResource";
import {editResource, getResource} from "../../../actions/resources";
import {useDispatch, useSelector} from "react-redux";
import {parseResource} from "../../../util/utils";
import {getRequiredResourceByID} from "../../common/functions";
const EditResource = () => {

    const { resource, id } = useParams();

    const dispatch = useDispatch();

    const [validationSchema] = getValidationSchema(resource === 'users' ? 'users-edit' : resource);
    const newResourceSchema = getNewResourceSchema(resource);
    const parsedResource = parseResource(resource);

    const initialValues = useSelector(state => state.data[parsedResource].find(item => item?._id === id));

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
        <>
            { isLoading ? <CircularProgress /> : (
                    initialValues ?
                        <HandleResource
                            validationSchema={validationSchema}
                            resourceSchema={newResourceSchema}
                            initialValues={initialValues}
                            dispatchCall={editResource}
                        />
                        : <p>nema</p>
            ) }
        </>
    );
};

export default EditResource;