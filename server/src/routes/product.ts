import express from "express";
import { get, searchProducts, getReviews, leaveReview, findReview, deleteReview } from "../controllers/product";

const router = express.Router();

router.get('/search', searchProducts);

router.get('/:code', get);

router.get('/reviews/:productID', getReviews);

router.post('/leave-review/:productID', leaveReview);

router.get('/find-review/:productID/:userID', findReview);

router.delete('/delete-review/:productID/:userID', deleteReview);

export default router;