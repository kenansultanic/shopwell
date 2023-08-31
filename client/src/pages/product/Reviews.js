import {Box, Grid, Pagination, Rating, Typography, CircularProgress} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {axiosClient} from "../../api/AxiosClient";
import {useNavigate, useParams} from "react-router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import {leaveReviewSchema} from "../../common/schemas/validationSchema";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../state/authSlice";
import {deleteReview, getReviews, leaveReview} from "../../actions/products";
import {useSearchParams} from "react-router-dom";
import {timePassed} from "../../util/utils";


const Review = ({ review, wasWrittenByCurrentUser, deleteReview }) => {

    const { _id, userName, rating, comment, createdAt } = review;

    const handleChange = (event, newValue) => {
        console.log(newValue)
    }
    return (
        <Box
            sx={{
                bgcolor: 'secondary.light',
                borderRadius: 2.5,
                py: 1,
                px: 2,
                my: 1,
            }}
        >
            <Box display="flex" justifyContent="space-between">
                <Rating value={rating} onChange={handleChange}/>
                {
                    wasWrittenByCurrentUser && (
                        <Button
                            vartiant="a"
                            aria-label="delete review"
                            sx={{ borderRadius: 3, width: 'fit-content', textTransform: 'none', color: 'secondary.dark' }}
                            onClick={() => deleteReview(_id)}
                        >
                            Delete
                        </Button>
                    )
                }
            </Box>
            <Typography variant="body1" sx={{ textDecoration: 'underline', color: 'secondary.dark', pb: 1, width: '100%' }}>
                { userName }:
            </Typography>
            <Typography variant="body2">
                { comment }
            </Typography>
            <Typography variant="subtitle2" align="right" sx={{ color: 'secondary.dark', mt: 1 }}>
                { timePassed(createdAt) }
            </Typography>
        </Box>
    );
};

const Reviews = () => {

    const { code } = useParams();
    const dispatch = useDispatch();

    const { _id: userID, firstName, lastName } = useSelector(selectCurrentUser);
    const reviews = useSelector(state => state.data.productReviews.filter(
        review => review.productID === code && review.userID !== userID
    ));
    const [userReview]= useSelector(state => state.data.productReviews.filter(review => review.userID === userID));

    const renderAfterCalled = useRef(false);

    const [previousReview, setPreviousReview] = useState(null);

    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [page, setPage] = useState(1);

    useEffect(() => {
        /*axiosClient.get(`/product/reviews/${code}?page=${page}`)
            .then(response => {
                setTotalPages(response.data.total);
                //setReviews(response.data.reviews);
            })*/

        if (renderAfterCalled.current) {
            renderAfterCalled.current = false;
            return;
        }

        renderAfterCalled.current = true;

        if (!reviews.length || Math.ceil(reviews.length / 5) < totalPages)
            dispatch(getReviews(code, page))
                .then(response => {
                    setTotalPages(response.data.total);
                })
                .catch(error => {
                    console.error(error);
                });

    }, [page]);

    const deleteUsersReview = id => {
        dispatch(deleteReview(id))
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error(error)
            })
    };

    const handleReviewChange = (event, newValue) => {
        setFieldValue('rating', newValue);
    };

    const onSubmit = async ({ comment, rating }, actions) => {

        if (!rating) return;

        const name = firstName.concat(' ', lastName);

        dispatch(leaveReview(code, userID, rating, comment, name))
        .then(response => {
            //navigate(`/product/${code}/reviews`)
            console.log(response)
            actions.resetForm();
        })
        .catch(error => {
            console.error(error)
        })
    };

    const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue, } = useFormik({
        initialValues: { comment: '', rating: null },
        validationSchema: leaveReviewSchema,
        onSubmit
    });

    return (
        <Box
            style={{
                minHeight: 'calc(100vh - 100px)',
                width: '100%',
                padding: '12px',
                marginTop: '12px'
            }}
        >
            <Typography variant="h5" fontWeight="800">Reviews</Typography>
            {
                !userReview ? (
                    <Box
                        noValidate
                        component="form"
                        display="flex"
                        flexDirection="column"
                        onSubmit={handleSubmit}
                        marginY={3}
                    >
                        <Typography variant="subtitle2" sx={{ color: 'secondary.dark', ml: .5 }}>
                            Leave rating*
                        </Typography>
                        <Rating
                            size="large"
                            value={values.rating}
                            onChange={handleReviewChange}
                            style={{ marginBottom: '16px' }}
                        />
                        <TextField
                            fullWidth
                            required
                            variant="standard"
                            id="comment"
                            name="comment"
                            label="Leave comment"
                            aria-label="leave comment"
                            value={values.comment}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.comment && touched.comment}
                            helperText={errors.comment && touched.comment ? errors.comment : ''}
                            style={{ paddingRight: '4px' }}
                        />
                        {
                            values.comment && (
                                <Box display="flex" justifyContent="end" marginX={.5} gap={1}>
                                    <Button
                                        variant="text"
                                        aria-label="cancel review"
                                        sx={{ mt: 3, mb: 2, borderRadius: 3, width: 'fit-content' }}
                                        disabled={isSubmitting}
                                        onClick={() => setFieldValue('comment', '')}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        aria-label="submit review"
                                        sx={{ mt: 3, mb: 2, borderRadius: 4, width: 'fit-content', textTransform: 'none' }}
                                        disabled={isSubmitting || !values.comment || !values.rating}
                                    >
                                        Leave review
                                    </Button>
                                </Box>
                            )
                    }
                    </Box>
                ) : (
                    <Review review={userReview} wasWrittenByCurrentUser deleteReview={deleteUsersReview} />
                )
            }
            {
                reviews ? (
                    reviews.map(review => (
                        <Review key={review._id} review={review} />
                    ))
                ) : (
                    isLoading ?
                        <CircularProgress />
                        : (
                            <Grid item style={{ textAlign: 'center' }}>
                                <Typography sx={{ color: 'secondary.dark' }}>
                                    This product does not have any reviews yet
                                </Typography>
                            </Grid>
                        )
                )
            }


            {/*
                reviews ?
                    <>
                    {
                        totalPages > 0 ?
                        <>
                            {
                                reviews.map(review => (
                                    <Review review={review} key={review._id} />
                                ))
                            }
                            <Grid item sm={12} md={10} lg={7} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Pagination count={totalPages} page={page} onChange={handlePaginate} />
                            </Grid>
                        </>
                        : (
                            <Grid item style={{ textAlign: 'center' }}>
                                <Typography sx={{ color: 'secondary.dark' }}>
                                        This product does not have any reviews yet
                                </Typography>
                            </Grid>
                        )
                    }
                    </>
                    : (
                        <Grid item style={{ textAlign: 'center' }}>
                            <CircularProgress />
                        </Grid>
                    )
            */}
            <Box>
                {
                    page < totalPages && (
                        <Box display="flex" justifyContent="center" marginTop={2} marginBottom={1}>
                            <Button
                                onClick={() => setPage(page+1)}
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: 3,
                                    color: 'secondary.dark',
                                    bgcolor: 'secondary.light'
                                }}
                            >
                                Load more
                            </Button>
                        </Box>
                    )
                }
            </Box>
        </Box>
    );
};

export default Reviews;
