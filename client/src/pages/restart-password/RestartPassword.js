import {Box, IconButton, InputAdornment} from "@mui/material";
import TextField from "@mui/material/TextField";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import {useFormik} from "formik";
import { resetCodeSchema } from "../../common/schemas/validationSchema";
import axios from "../../api/AxiosClient";
import Button from "@mui/material/Button";

const RestartPassword = ({ email, setIsSubmitting }) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordField = () => setShowPassword(!showPassword);

    const onSubmit = ({ password, code }, actions) => {

        axios.patch('/auth/restart-password', {
            password,
            code,
            email
        })
            .then(response => {

            })
            .catch(error => {

            });
    }

    const {values, errors, touched, status, isSubmitting, handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues: { code: '', password: '' },
        validationSchema: resetCodeSchema,
        onSubmit
    });

    setIsSubmitting(isSubmitting);


    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 8}}>
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={togglePasswordField}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                value={""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password}
                helperText={
                    errors.password && touched.password ?
                        errors.password :
                        'A 6 digit code was sent to your email'
                }
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                disabled={isSubmitting}
            >
                Restart
            </Button>
        </Box>
        );
}

export default RestartPassword;