import {Box, CircularProgress, Rating, TextareaAutosize, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import {leaveReviewSchema} from "../../common/schemas/validationSchema";
import Button from "@mui/material/Button";
import {axiosClient} from "../../api/AxiosClient";
import TextField from "@mui/material/TextField";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../state/authSlice";

const LeaveReview = () => {

    const navigate = useNavigate();

    const { code } = useParams();
    const { _id: userID, firstName, lastName } = useSelector(selectCurrentUser);

    const [rating, setRating] = useState(0);
    const [previousReview, setPreviousReview] = useState(null);

    useEffect(() => {
        axiosClient.get(`/product/find-review/${code}/${userID}`)
            .then(response => {
                setPreviousReview(response.data.previousReview);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const deleteReview = () => {
        axiosClient.delete(`/product/delete-review/${code}/${userID}`)
            .then(response => {
                setPreviousReview(false);
            })
            .catch(error => {
                console.log(error)
            })
    };

    const onSubmit = async ({ comment }, actions) => {

        if (rating === 0) return;

        axiosClient.post(`/product/leave-review/${code}`, { userID, rating, comment, userName: firstName.concat(' ', lastName) })
            .then(response => {
                navigate(`/product/${code}/reviews`)
            })
            .catch(error => {
                console.log(error)
            })
    };

    const handleReviewChange = (event, newValue) => {
        setRating(newValue)
    };

    const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: { comment: '' },
        validationSchema: leaveReviewSchema,
        onSubmit
    });

    return (
        <Box>
            {
                previousReview ? (
                    <>
                        <Box
                            sx={{
                                bgcolor: 'secondary.light',
                                borderRadius: 2.5,
                                py: 1,
                                px: 2,
                                my: 1,
                                width: {
                                    lg: '800px',
                                    md: '600px',
                                    sm: '550px',
                                    xs: '300px'
                                }
                            }}
                        >
                            <Rating readOnly size="large" value={previousReview.rating} />
                            <Typography variant="body1" sx={{ textDecoration: 'underline', color: 'secondary.dark', pb: 1, width: '100%' }}>
                                { previousReview.userName }:
                            </Typography>
                            <Typography variant="body2">
                                { previousReview.comment }
                            </Typography>
                            <Typography variant="subtitle2" align="right" sx={{ color: 'secondary.dark', mt: 1 }}>
                                3 days ago
                            </Typography>
                        </Box>
                        <Button onClick={deleteReview} sx={{ color: 'secondary.dark', ':hover': { bgcolor: 'secondary.light' } }}>
                            Delete review
                        </Button>
                    </>
                ) : previousReview === false ? (
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: {
                                lg: '800px',
                                md: '600px',
                                sm: '550px',
                                xs: '300px'
                            }
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ color: 'secondary.dark', ml: .75 }}>Leave rating*</Typography>
                        <Rating
                            size="large"
                            value={rating}
                            onChange={handleReviewChange}
                            style={{
                                marginBottom: '16px'
                            }}
                        />
                        <TextField
                            multiline
                            fullWidth
                            id="comment"
                            name="comment"
                            aria-label="leave comment"
                            placeholder="Leave comment"
                            minRows={3}
                            value={values.comment}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.comment && touched.comment}
                            helperText={errors.comment && touched.comment ? errors.comment : ''}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isSubmitting}
                        >
                            Leave review
                        </Button>
                    </Box>
                ) : <CircularProgress />

            }
        </Box>
    );
}

export default LeaveReview