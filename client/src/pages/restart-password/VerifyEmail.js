import TextField from "@mui/material/TextField";
import {useFormik} from "formik";
import {emailSchema} from "../../common/schemas/validationSchema";
import {Box} from "@mui/material";
import axios from "../../api/AxiosClient";
import Button from "@mui/material/Button";

const VerifyEmail = ({setIsSubmitting}) => {

    const onSubmit = async ({ email, setIsSubmitting }, actions) => {

        axios.get('/auth/check-email', { params: { email } })
            .then(response => {

                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    }

    const {values, errors, touched, status, isSubmitting, handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues: { email: '' },
        validationSchema: emailSchema,
        onSubmit
    });

    setIsSubmitting(isSubmitting)

    return(
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 8}}>
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
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                disabled={isSubmitting}
            >
                Send code
            </Button>
        </Box>
        );
}

export default VerifyEmail;