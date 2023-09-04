import Paper from "@mui/material/Paper";
import {useFormik} from "formik";
import {getValidationSchema} from "../../common/schemas/formik-schema";
import {useNavigate, useParams} from "react-router";
import {getNewResourceSchema} from "../../common/schemas/new-resource-schema";
import StyledTextField from "../common/StyledTextField";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {Box, MenuItem, Typography} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import {useState} from "react";
import {saveResource} from "../../../api/admin";
import {useDispatch} from "react-redux";
import ClearIcon from '@mui/icons-material/Clear';
import MultipleInput from "../common/MultipleInput";

const CustomTextField = ({ item, values, errors, touched, status, handleChange, handleBlur, isSelect, children }) => {

    return (
        <TextField
            fullWidth
            size="small"
            margin="normal"
            multiline={!!item.multiline}
            select={isSelect}
            minRows={item.multiline && 3}
            defaultValue={item.options && item.options[0].value}
            id={item.field}
            label={item.headerName}
            name={item.field}
            value={values[item.field]}
            required={item.required}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(errors[item.field] && touched[item.field]) || (status && !!status[item.field])}
            helperText={
                (errors[item.field] && touched[item.field] ? errors[item.field] : ' ') ||
                (status[item.field] ? status[item.field] : ' ')
            }
        >
            { children }
        </TextField>
    );
};

const HandleResource = ({ resourceSchema, validationSchema, initialValues, dispatchCall }) => {

    const { resource, id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (values, actions) => {
        dispatch(dispatchCall(values, resource, id))
            .then(response => {
                console.log(response.data)
                actions.resetForm();
            })
            .catch(error => {
                console.error(error);
            });
    };

    const { values, errors, touched, status, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm } = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true
    });
    console.log(errors)

    const setMultipleFieldValue = (value, field) => {
        if (field === 'nutritionalValuePer100grams') {
            const parsedValues = [];
            value.forEach(item => {
                const parsedValue = item.split(' ');
                parsedValues.push({ name: parsedValue[0], value: Number(parsedValue[1]) });
            });
            setFieldValue('nutritionalValuePer100grams', parsedValues);
        }
        else setFieldValue(field, value);
    };

    const handleCancelButtonClick = () => {
      navigate(-1);
      resetForm();
    };

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
            <Button variant="outlined" color="warning" style={{ textTransform: 'none' }} onClick={handleCancelButtonClick}>
                <ClearIcon fontSize="small" /> &nbsp; Cancel
            </Button>
        </Box>
        <Paper component="form" noValidate onSubmit={handleSubmit}
               sx={{ mt: 6, p: 3, display: 'flex', flexDirection: 'column' }}
        >
            {
                resourceSchema.map(item => (
                    item.type === 'string' ?
                        <CustomTextField
                            key={item.field}
                            values={values}
                            item={item}
                            status={status}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                        />
                        : item.type === 'enum' ? (
                            <CustomTextField
                                key={item.field}
                                isSelect
                                values={values}
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
                            </CustomTextField>
                        ) : item.type === 'image' ? (
                            <MuiFileInput
                                fullWidth
                                required={!id}
                                size="small"
                                margin="normal"
                                key={item.field}
                                inputProps={{ accept: '.png, .jpeg' }}
                                id={item.field}
                                label={item.headerName}
                                name={item.field}
                                value={values.image}
                                onChange={value => setFieldValue('image', value)}
                                error={!!(errors[item.field] && touched[item.field])}
                                helperText={(errors[item.field] && touched[item.field] ? errors[item.field] : ' ')}
                            />
                        ) : item.type === 'multiple-string' ? (
                            <MultipleInput
                                key={item.field}
                                fieldName={item.field}
                                value={values[item.field]}
                                label={item.headerName}
                                required={item.required}
                                error={!!(errors[item.field] && touched[item.field])}
                                helperText={(errors[item.field] && touched[item.field] ? errors[item.field] : ' ')}
                                handleBlur={handleBlur}
                                setMultipleFieldValue={setMultipleFieldValue}
                            />
                        ) : undefined
                ))
            }
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, m: 'auto' }}
                disabled={isSubmitting || JSON.stringify(initialValues) === JSON.stringify(values)}
            >
                Save
            </Button>
        </Paper>
        </>
    );
};

export default HandleResource;