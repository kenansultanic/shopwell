import Paper from "@mui/material/Paper";
import {useFormik} from "formik";
import {promoEmailSchema} from "../common/schemas/formik-schema";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {sendPromoEmail} from "../../api/admin";

const PromotionalEmail = () => {

    const onSubmit = async (values, actions) => {

        try {
            const response = await sendPromoEmail(values);
            actions.resetForm();
        }
        catch (error) {
            console.error(error)
        }
    };

    const { values, errors, touched, status, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: { subject: '', title: '', body: '' },
        validationSchema: promoEmailSchema,
        onSubmit
    });

    return (
        <Box style={{ padding: '0 10px', margin: 'auto', marginTop: '20px' }}>
            <Typography variant="h5">Send Promotional Email</Typography>
            <Paper component="form" noValidate onSubmit={handleSubmit}
                   sx={{ mt: 6, p: 3, '.MuiFormControl-root': { my: '10px' } }}
            >
                <TextField
                    autoFocus
                    required
                    fullWidth
                    id="subject"
                    label="Subject of email"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={(errors.subject && touched.subject) || !!status?.subject}
                    helperText={(errors.subject && touched.subject ? errors.subject : ' ') || (status?.subject ? status.subject : ' ')}
                />
                <TextField
                    required
                    fullWidth
                    id="title"
                    label="Email title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={(errors.title && touched.title) || !!status?.title}
                    helperText={(errors.title && touched.title ? errors.title : ' ') || (status?.title ? status.title : ' ')}
                />
                <TextField
                    required
                    multiline
                    fullWidth
                    id="body"
                    label="Email body"
                    name="body"
                    minRows={3}
                    value={values.body}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={(errors.body && touched.body) || !!status?.body}
                    helperText={(errors.body && touched.body ? errors.body : ' ') || (status?.body ? status.body : ' ')}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isSubmitting}
                >
                    Send Emails
                </Button>
            </Paper>
        </Box>
    );
};

export default PromotionalEmail;