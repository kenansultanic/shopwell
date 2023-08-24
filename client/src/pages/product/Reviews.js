import {Box, Grid, Pagination, Rating, Typography, CircularProgress} from "@mui/material";
import {useEffect, useState} from "react";
import {axiosClient} from "../../api/AxiosClient";
import {useParams} from "react-router";


const Review = ({ review }) => {

    const { userName, userID, rating, comment } = review;

    const handleChange = (event, newValue) => {
        console.log(newValue)
    }
    return (
        <Grid
            item
            sm={12}
            md={10}
            lg={7}
        >
            <Box
                sx={{
                    bgcolor: 'secondary.light',
                    borderRadius: 2.5,
                    py: 1,
                    px: 2,
                    my: 1,
                }}
            >
                <Rating value={rating} onChange={handleChange}/>
                <Typography variant="body1" sx={{ textDecoration: 'underline', color: 'secondary.dark', pb: 1, width: '100%' }}>
                    { userName }:
                </Typography>
                <Typography variant="body2">
                    { comment }
                </Typography>
                <Typography variant="subtitle2" align="right" sx={{ color: 'secondary.dark', mt: 1 }}>
                    3 days ago
                </Typography>
            </Box>
        </Grid>
    );
};

const Reviews = () => {

    const { code } = useParams();

    const [reviews, setReviews] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axiosClient.get(`/product/reviews/${code}?page=${page}`)
            .then(response => {
                setTotalPages(response.data.total);
                setReviews(response.data.reviews);
            })
    }, [page]);

    const handlePaginate = (event, value) => {
        setPage(value)
    };

    return (
        <Grid
            container
            style={{
                minHeight: 'calc(100vh - 100px)',
                justifyContent: 'center',
                padding: '10px',
            }}
        >
            {
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
            }
        </Grid>
    );
};

export default Reviews;
