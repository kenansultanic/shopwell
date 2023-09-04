import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Copyright from '../../common/components/Copyright';
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useEffect, useRef, useState} from "react";
import {useFormik} from "formik";
import {initialSigninValues, signinSchema} from "../../common/schemas/validationSchema";
import axios from "../../api/AxiosClient";
import {useDispatch, useSelector} from "react-redux";
import {setCredentials, setError} from "../../state/authSlice";
import {useNavigate, useOutletContext} from "react-router";
import {useGoogleLogin, GoogleLogin} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import {login} from "../../actions/users";

const SignIn = () => {

    //const clientId = "751064780599-08be9ah5chk34indqkbivnpf916lq45s.apps.googleusercontent.com";
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const googleSignIn = response => {
        const userObject = jwt_decode(response.credential);

        if (userObject.emailNotVerified)
            console.error("i ovdje error handler")

        dispatch(login(true, userObject.email))
            .then(response => navigate('/product/scan'))
            .catch(error => dispatch(setError({ error: error.message ?? 'An error occurred' })));
    };

    const handleGoogleSignInError = error => {
        dispatch(setError({ error: error.message ?? 'Could not log in' }));
    }

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordField = () => setShowPassword(!showPassword);

    const onSubmit = async (values, actions) => {

        axios.post('/auth/login', { ...values })
            .then(response => {
                console.log(response.data.user)
                dispatch(setCredentials({ user: response.data.user}));
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                navigate('/product/scan');
                actions.resetForm();
            })
            .catch(error => {
                dispatch(setError({ error: error.response?.data?.message ?? 'Could not log in' }));
                if (error.response?.status === 409 || error.response?.status === 400)
                    actions.setErrors({ email: error.response.data.message });
                else actions.setErrors({ email: error.message || 'An error occurred' });
            });
    }

    const {values, errors, touched, status, isSubmitting, handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues: initialSigninValues,
        validationSchema: signinSchema,
        onSubmit
    });

    return (
        <Grid container component="main" sx={{ height: '100vh', justifyContent: 'center' }}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            autoFocus
                            required
                            fullWidth
                            margin="normal"
                            size="small"
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={(errors.email && touched.email) || !!status?.email}
                            helperText={
                                (errors.email && touched.email ? errors.email : ' ') ||
                                (status?.email ? status.email : ' ')
                            }
                        />
                        <TextField
                            required
                            fullWidth
                            size="small"
                            margin="normal"
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
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.password && touched.password}
                            helperText={errors.password && touched.password ? errors.password : ' '}
                        />
                        {/*<FormControlLabel style={{ display: 'block' }}
                            control={<Checkbox id="rememberMe" name="rememberMe"
                                               color="primary"
                                               value={values.rememberMe}
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                    />}
                            label="Remember me"
                        />*/}
                        <Box display="flex" flexDirection="column" alignItems="center" marginBottom={2} marginTop={1}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, py: 1, width: '190px', borderRadius: '32px', textTransform: 'none' }}
                                disabled={isSubmitting}
                            >
                                Sign In
                            </Button>
                            <GoogleLogin
                                onSuccess={googleSignIn}
                                onError={handleGoogleSignInError}
                                width="190px"
                                text="signin_with"
                                shape="pill"
                                theme={'outline'}
                            />
                        </Box>
                        <Grid container marginTop={5}>
                            <Grid item xs>
                                <Link href="/restart-password" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 2 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default SignIn;