import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useFormik} from "formik";
import { updateUserInfoSchema } from "../../../common/schemas/validationSchema";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {selectCurrentAccessToken, selectCurrentUser, selectRefreshToken, setUser} from "../../../state/authSlice";
import {useDispatch, useSelector} from "react-redux";
import { getAxiosInstance, axiosClient} from "../../../api/AxiosClient";
import {useEffect, useState} from "react";

const UpdateUserInfo = () => {

    const dispatch = useDispatch();

    const [user, setUserr] = useState(useSelector(selectCurrentUser));
    const [initialValues, setInitialValues] = useState(JSON.parse(JSON.stringify(user)));
    const axios = getAxiosInstance(useSelector(selectCurrentAccessToken));//brisi
    let refreshToken = useSelector(selectRefreshToken);

    const test = () => {
        axios.get('/auth/new-access-token', { params: { refreshToken } })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.error(err)
            })
    }
    const onSubmit = (values, actions) => {

        const infoToUpdate = {};

        if (values.firstName !== user.firstName)
            infoToUpdate.firstName = values.firstName;

        if (values.lastName !== user.lastName)
            infoToUpdate.lastName = values.lastName;

        if (values.email !== user.email)
            infoToUpdate.email = values.email;

        axiosClient.patch(`/auth/user-info/${user._id}`, { ...infoToUpdate })
            .then(response => {
                dispatch(setUser({
                    user: response.data.updated
                }));
                setUserr(response.data.updated);
                setInitialValues(response.data.updated);
            })
            .catch(error => {
                console.error(error)
                if (error.response.status === 304)
                    actions.setStatus({ email: 'error.response.data.message' });
                else actions.setStatus({ email: 'An error occurred' });
            })
            .finally(() => {
                actions.resetForm();
            })
    }

    useEffect(() => {
        setToInitial();
    }, [user]);

    const setToInitial = () => {
        setFieldValue('firstName', user.firstName);
        setFieldValue('lastName', user.lastName);
        setFieldValue('email', user.email);
    }

    const { values, errors, touched, status, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue, submitForm } = useFormik({
        validationSchema: updateUserInfoSchema,
        initialValues,
        onSubmit
    });

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ pb: 2, pt: 3, px: { md: .5, lg: 3 } }}>
            <Grid container spacing={2} style={{ padding: '10px' }}>
                <Grid item xs={12} sm={9} md={7}>
                    <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.firstName && touched.firstName}
                        helperText={errors.firstName && touched.firstName ? errors.firstName : ''}
                    />
                </Grid>
                <Grid item xs={12} sm={9} md={7}>
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.lastName && touched.lastName}
                        helperText={errors.lastName && touched.lastName ? errors.lastName : ''}
                    />
                </Grid>
                <Grid item xs={12} sm={9} md={7}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={(errors.email && touched.email) || !!status?.email}
                        helperText={(errors.email && touched.email ? errors.email : '') || (status?.email ? status.email : '')}
                    />
                </Grid>
                <Grid item xs={12} sm={9} md={7}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isSubmitting || JSON.stringify(initialValues) === JSON.stringify(values)}
                    >
                        Update
                    </Button>
                </Grid>
                <Grid item xs={12} sm={9} md={7}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={setToInitial}
                        disabled={JSON.stringify(initialValues) === JSON.stringify(values)}
                    >
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default UpdateUserInfo;