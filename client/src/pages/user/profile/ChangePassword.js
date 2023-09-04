import {Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment} from "@mui/material";
import PasswordInput from "../../../common/components/PasswordInput";
import { useFormik } from "formik";
import { updateUserPasswordSchema } from "../../../common/schemas/validationSchema";
import Button from "@mui/material/Button";
import {axiosClient} from "../../../api/AxiosClient";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import {changePassword} from "../../../api/user";

const ChangePassword = () => {

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const toggleOldPasswordField = () => setShowOldPassword(!showOldPassword);
    const toggleNewPasswordField = () => setShowNewPassword(!showNewPassword);

    const onSubmit = ({ oldPassword, newPassword }, actions) => {

        if (oldPassword === newPassword) {
            actions.setErrors({ newPassword: 'New password cannot be same as old password' });
            actions.setSubmitting(false);
            return;
        }

        changePassword(oldPassword, newPassword)
            .then(response => {
                actions.resetForm();
            })
            .catch(error => {
                actions.setErrors({ oldPassword: error.data?.message ?? 'An error occurred' });
                actions.setSubmitting(false);
            });
    };

    const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: { oldPassword: '', newPassword: '' },
        validationSchema: updateUserPasswordSchema,
        onSubmit
    });

    return (
        <Grid container>
            <Grid item xs={11} sm={9} md={7} style={{ marginLeft: '24px', marginTop: '48px' }}>
                <Box component="form" noValidate onSubmit={handleSubmit}>
                    <TextField
                        required
                        fullWidth
                        size="small"
                        margin="normal"
                        name="oldPassword"
                        label="Old password"
                        type={ showOldPassword ? 'text' : 'password' }
                        id="oldPassword"
                        autoComplete="current-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleOldPasswordField}
                                        edge="end"
                                    >
                                        { showOldPassword ? <VisibilityOff/> : <Visibility/> }
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.oldPassword}
                        error={errors.oldPassword && touched.oldPassword}
                        helperText={errors.oldPassword && touched.oldPassword ? errors.oldPassword : ' '}
                    />
                    <TextField
                        required
                        fullWidth
                        size="small"
                        margin="normal"
                        name="newPassword"
                        label="New password"
                        type={ showNewPassword ? 'text' : 'password' }
                        id="newPassword"
                        autoComplete="current-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleNewPasswordField}
                                        edge="end"
                                    >
                                        { showNewPassword ? <VisibilityOff/> : <Visibility/> }
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.newPassword}
                        error={errors.newPassword && touched.newPassword}
                        helperText={errors.newPassword && touched.newPassword ? errors.newPassword : ' '}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ mt: 4.5 }}
                        disabled={isSubmitting}
                    >
                        Change
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ChangePassword;