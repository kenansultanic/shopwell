import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Copyright from '../../common/components/Copyright';
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import LockResetIcon from '@mui/icons-material/LockReset';
import {useState} from "react";
import {useFormik} from "formik";
import { emailSchema, resetCodeSchema} from "../../common/schemas/validationSchema";
import axios from "../../api/AxiosClient";
import Link from "@mui/material/Link";
import { CircularProgress } from "@mui/material";
import {useNavigate} from "react-router";

const Index = () => {

    // noinspection DuplicatedCode
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState(null);

    const navigate = useNavigate();
    const togglePasswordField = () => setShowPassword(!showPassword);

    const onSubmit = async (values, actions) => {

        email ?
            restartPassword(values, actions) :
            verifyEmail(values, actions);
    }

    const verifyEmail = ({ email }, actions) => {
        axios.get('/auth/check-email', { params: { email } })
            .then(response => {
                setEmail(response.data?.email);
                actions.resetForm();
            })
            .catch(error => {
                actions.setStatus({ email: error.response.data?.message });
            })
    }

    const restartPassword = (values, actions) => {
        axios.patch('/auth/restart-password', { ...values, email }, { withCredentials: true })
            .then(response => {
                setIsLoading(true);
                setInterval(() => {
                    navigate('/');
                    setIsLoading(false);
                }, 2000);
            })
            .catch(error => {
                actions.setStatus({ code: error.response.data?.message });
            })
    }

    const {values, errors, touched, status, isSubmitting, handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues: email ? { code: '', password: '' } : { email: '' },
        validationSchema: email ? resetCodeSchema : emailSchema,
        onSubmit
    });

    return (
        <Grid container component="main" sx={{height: '100vh'}}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
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
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockResetIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Restart password
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: email ? 6 : 8 }}>
                        {
                            isLoading ?
                                (
                                    <Box
                                        sx={{
                                            width: '100%',
                                            mb: 3,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography variant="body1">
                                            Your password was successfully updated
                                        </Typography>
                                        <CircularProgress  sx={{ mt: 6, mb: 2 }} />
                                    </Box>
                                ) :
                                !email ?
                                    (
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Enter your email address"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={(errors.email && touched.email) || !!status?.email}
                                            helperText={(errors.email && touched.email ? errors.email : '') || (status?.email ? status.email : '')}
                                        />
                                    ) : (
                                        <>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="code"
                                                label="Enter the 6 digit code sent to your email"
                                                name="code"
                                                autoFocus
                                                value={values.code}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={(errors.code && touched.code) || !!status?.code}
                                                helperText={errors.code && touched.code ? errors.code : status?.code ? status.code : ''}
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
                                            <Grid container>
                                                <Grid item>
                                                    <Link
                                                        component="p"
                                                        variant="body2"
                                                        sx={{ cursor: 'pointer' }}
                                                        onClick={() => setEmail(false)}
                                                    >
                                                        Go back
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </>
                                    )
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isSubmitting || isLoading}
                        >
                            {
                                email ?
                                    'Restart' :
                                    'Send code'
                            }
                        </Button>
                        <Copyright sx={{ mt: email ? 1 : 8 }}/>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Index;