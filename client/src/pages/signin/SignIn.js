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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../../common/components/Copyright';
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import { useState } from "react";
import {useFormik} from "formik";
import {initialSigninValues, signinSchema} from "../../common/schemas/validationSchema";
import axios from "../../api/AxiosClient";
import {useDispatch, useSelector} from "react-redux";
import {setCredentials} from "../../state/authSlice";
import {useNavigate} from "react-router";

const theme = createTheme();

const SignIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordField = () => setShowPassword(!showPassword);

    const testna = async params => {
        axios.get('/auth/login', { params })
            .then(response => {
                console.log(response.data);
                return response;
            })
            .catch(error => {
                throw error;
            });
    }

    const onSubmit = async (values, actions) => {

        // try {
        //     const data = await testna(values);
        //     console.log('data', data)
        // }
        // catch (error) {
        //     if (error.response.status === 409)
        //         actions.setStatus({ email: error.response.data.message });
        //     else actions.setStatus({ email: 'An error occurred' });
        // }

        axios.post('/auth/login', { ...values })
            .then(response => {
                console.log(response.data.user)
                dispatch(
                    setCredentials({
                        user: response.data.user,
                        accessToken: response.data.accessToken,
                        refreshToken: response.data.refreshToken
                    })
                );
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                actions.resetForm();
            })
            .catch(error => {
                if (error.response?.status === 409 || error.response?.status === 400)
                    actions.setStatus({ email: error.response.data.message });
                else actions.setStatus({ email: error.message || 'An error occurred' });
            });
    }

    const {values, errors, touched, status, isSubmitting, handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues: initialSigninValues,
        validationSchema: signinSchema,
        onSubmit
    });

    // TODO (ispravi temu)
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            //TODO dodaj svugdje
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
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
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={(errors.email && touched.email) || !!status?.email}
                                helperText={(errors.email && touched.email ? errors.email : '') || (status?.email ? status.email : '')}
                            />
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
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.password && touched.password}
                                helperText={errors.password && touched.password ? errors.password : ''}
                            />
                            <FormControlLabel
                                control={<Checkbox id="rememberMe" name="rememberMe"
                                                   color="primary"
                                                   value={values.rememberMe}
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                        />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={isSubmitting}
                            >
                                Sign In
                            </Button>
                            <Grid container>
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
                            <Copyright sx={{ mt: 4 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default SignIn;