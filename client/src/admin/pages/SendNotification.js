import { io } from "socket.io-client";
import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import {notificationSchema} from "../common/schemas/formik-schema";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {useEffect} from "react";

const socket = io.connect('http://localhost:4000');

const SendNotification = () => {

    const sendNotification = (values, actions) => {
        socket.emit('send_notification', { ...values });
        actions.resetForm();
    };

    const { values, errors, touched, status, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: { tag: '', content: '' },
        validationSchema: notificationSchema,
        onSubmit: sendNotification
    });

    return (
        <Box style={{ padding: '0 10px', margin: 'auto', marginTop: '20px' }}>
            <Typography variant="h5">Send Promotional Email</Typography>
            <Paper component="form" noValidate onSubmit={handleSubmit}
                   sx={{ mt: 6, p: 3, '.MuiFormControl-root': { my: '10px' } }}
            >
                <TextField
                    fullWidth
                    id="tag"
                    name="tag"
                    label="Tag"
                    size="small"
                    autoFocus
                    value={values.tag}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={(errors.tag && touched.tag) || !!status?.tag}
                    helperText={(errors.tag && touched.tag ? errors.tag : ' ') || (status?.tag ? status.tag : ' ')}
                />
                <TextField
                    required
                    fullWidth
                    id="content"
                    name="content"
                    label="Content"
                    size="small"
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={(errors.content && touched.content) || !!status?.content}
                    helperText={
                        (errors.content && touched.content ? errors.content : ' ') ||
                        (status?.content ? status.content : ' ')
                    }
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

export default SendNotification;