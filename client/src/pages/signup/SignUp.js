import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../common/components/Copyright';
import {useState} from 'react';
import {IconButton, InputAdornment} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {useFormik} from 'formik';
import {validationSchema, initialSignupValues} from '../../common/schemas/validationSchema';
import axios from '../../api/AxiosClient';
import jwt_decode from "jwt-decode";
import {GoogleLogin} from "@react-oauth/google";
import { register } from "../../actions/users";
import {useDispatch} from "react-redux";

const SignUp = () => {

    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordField = () => setShowPassword(!showPassword);


    const googleSignUp = response => {
        const { email_verified, email, given_name, family_name, picture } = jwt_decode(response.credential);

        if (!email_verified)
            console.error("i ovdje error handler")

        dispatch(register({ withGoogle: true, email, picture, firstName: given_name, lastName: family_name }))
            .then(response => console.log(response))
            .catch(error => console.log(error));
    };

    const handleGoogleSignUpError = () => {
        //todo dodaj error handler
    }

    const onSubmit = async (values, actions) => {

        axios.post('/auth/register', values)
            .then(response => {
                //console.info(response);
                actions.resetForm();
            })
            .catch(error => {
                if (error.response.status === 409)
                    actions.setStatus({ email: error.response.data.message });
                else actions.setStatus({email: 'Server error'}) //Todo(popravi)

            });
        // await new Promise(resolve => setTimeout(resolve, 1000));
        //console.log(values)
    }

    const { values, errors, touched, status, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialSignupValues,
        validationSchema: validationSchema,
        onSubmit
    });

    // TODO(Obrisi)
    const handleSubmite = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
            promotion: data.get('allowExtraEmails')
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                marginTop={4}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box noValidate component="form" marginTop={2} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                size="small"
                                autoComplete="given-name"
                                name="firstName"
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.firstName && touched.firstName}
                                helperText={errors.firstName && touched.firstName ? errors.firstName : ' '}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                size="small"
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.lastName && touched.lastName}
                                helperText={errors.lastName && touched.lastName ? errors.lastName : ' '}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                size="small"
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={(errors.email && touched.email) || !!status?.email}
                                helperText={(errors.email && touched.email ? errors.email : ' ') || (status?.email ? status.email : ' ')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                size="small"
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="new-password"
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
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.password && touched.password}
                                helperText={errors.password && touched.password ? errors.password : ' '}
                            />
                        </Grid>
                        <Grid item xs={12} margin={0}>
                            <FormControlLabel style={{ display: 'flex !important', alignItems: 'center' }}
                                control={<Checkbox id="allowExtraEmails" name="allowExtraEmails"
                                                   value={values.allowExtraEmails}
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   color="primary"
                                        />}
                                label="I want to receive promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Box display="flex" flexDirection="column" alignItems="center" marginBottom={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, py: 1, width: '190px', borderRadius: '32px', textTransform: 'none' }}
                            disabled={isSubmitting}
                        >
                            Sign Up
                        </Button>
                        <GoogleLogin
                            onSuccess={googleSignUp}
                            onError={handleGoogleSignUpError}
                            width="190px"
                            text="signup_with"
                            shape="pill"
                            theme={'outline'}
                        />
                    </Box>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }}/>
        </Container>
    );
}

export default SignUp;