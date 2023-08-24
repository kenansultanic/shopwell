import mongoose from "mongoose";

export interface ProductReviewDocument extends mongoose.Document {
    userID: string,
    userName: string,
    productID: string,
    rating: number,
    comment?: string
};

const ProductReviewSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    productID: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String
    }
}, { timestamps: { createdAt: true, updatedAt: false }});

const ProductReview = mongoose.model<ProductReviewDocument>('productReview', ProductReviewSchema);

export default ProductReview;