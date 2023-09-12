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
import { saveResource } from "../../actions/resources";
import CustomResourceTextField from "../common/CustomResourceTextField";
import AddIcon from "@mui/icons-material/Add";
import {useDispatch, useSelector} from "react-redux";
import {getRequiredResourceByID} from "../../common/functions";
import {parseResource} from "../../../util/utils";
import HandleResource from "./HandleResource";
/*
*
* <MuiFileInput required fullWidth size="small" margin="normal" id={item.field}
                                              label={item.headerName}
                                              name={item.field} value={item.value} onChange={handleChangee} helperText={'tekst'} />
                                              *
                                              *
<StyledTextField
                required
                fullWidth
                id="subject"
                label="Subject of email"
                name="subject"
                size="small"
                autoFocus
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={"test neki test"}
            />                                              *
*/

/*
const NewResource = () => {

    const { resource } = useParams();

    const [validationSchema, initialValues] = getValidationSchema(resource);
    const newResourceSchema = getNewResourceSchema(resource);

    const [file, setFile] = useState(null);

    const handleChangee = (newFile) => {
        setFile(newFile)
    }
    const onSubmit = async (values, actions) => {

        try {
            const response = await saveResource(values, resource);
            console.log(response)
            //actions.res
        }
        catch (error) {
            console.error(error)
        }
    };

    const { values, errors, touched, status, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });
//console.log(values)
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
                <Button variant="outlined" color="warning" style={{ textTransform: 'none' }}>
                    <AddIcon fontSize="small" /> &nbsp; Cancel
                </Button>
            </Box>
            <Paper component="form" noValidate onSubmit={handleSubmit}
                   sx={{ mt: 6, p: 3, display: 'flex', flexDirection: 'column' }}
            >
                {
                    newResourceSchema.map(item => (
                        item.type === 'string' ?
                            <CustomResourceTextField
                                key={item.field}
                                item={item}
                                status={status}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                            />
                            : item.type === 'enum' ? (
                                <CustomResourceTextField
                                    isSelect
                                    key={item.field}
                                    item={item}
                                    status={status}
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                >
                                {
                                    item.options.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            { option.label }
                                        </MenuItem>
                                    ))
                                }
                                </CustomResourceTextField>
                            ) : (
                                <MuiFileInput
                                    fullWidth
                                    required
                                    size="small"
                                    margin="normal"
                                    key={item.field}
                                    inputProps={{ accept: '.png, .jpeg' }}
                                    id={item.field}
                                    label={item.headerName}
                                    name={item.field}
                                    value={values.image}
                                    onChange={value => setFieldValue('image', value)}
                                    error={(errors[item.field] && touched[item.field])}
                                    helperText={(errors[item.field] && touched[item.field] ? errors[item.field] : ' ')}
                                />
                            )



                    ))
                }
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, m: 'auto' }}
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Paper>
        </>
    );
};

 */

const NewResource = () => {

    const { resource } = useParams();

    const [validationSchema, initialValues] = getValidationSchema(resource === 'products' ? 'products-new' : resource);
    const newResourceSchema = getNewResourceSchema(resource);

    return (
        ['products', 'restrictions'].includes(resource) ?
        <>
            <HandleResource
                validationSchema={validationSchema}
                resourceSchema={newResourceSchema}
                initialValues={initialValues}
                dispatchCall={saveResource}
            />
        </> : (
            <Box display="flex" justifyContent="center">
                <Typography>You can't create a new resource of that type</Typography>
            </Box>
        )
    );
};

export default NewResource;