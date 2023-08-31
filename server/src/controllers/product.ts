import { Request, Response } from "express";
import Product from "../models/product.model";
import ProductReview from "../models/productReview.model";

export const save = async (req: Request, res: Response) => {

    const { name, code } = req.body;

    const product = new Product({
        name,
        code
    });

    try {
        const newProduct = await product.save();
        res.status(201).json({ product: newProduct });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const get = async (req: Request, res: Response) => {

    const { code } = req.params;

    try {
        const product = await Product.findOne({ code });

        if (!product)
            return res.status(404).json({ message: 'Product does not exist' });

        const productReviewssCount = await ProductReview.countDocuments({ productID: code });

        if (!productReviewssCount)
            return res.status(200).json({ product });

        const [{ count, sum }] = await ProductReview.aggregate([
            { $match: { productID: code } },
            { $group: { _id: null, sum: { $sum: "$rating" }, count: { $sum: 1 } } }
        ]);

        res.status(200).json({ product, rating: sum / count });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getReviews = async (req: Request, res: Response) => {

    const { page } = req.query;
    const { productID } = req.params;

    try {
        const LIMIT = 5; // Number of reviews per page
        const startIndex = (Number(page) - 1) * LIMIT; // index of the first review of a page
        const total = await ProductReview.countDocuments({ productID }); // Total number of reviews

        const reviews = await ProductReview.find({ productID }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        
        res.status(200).json({ reviews, total: Math.ceil(total / LIMIT) });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const leaveReview = async (req: Request, res: Response) => {

    const { productID } = req.params;
    const { rating, comment, userName, userID } = req.body;

    try {

        const review = new ProductReview({
            productID,
            rating,
            comment,
            userID,
            userName
        });

        const newReview = await review.save();

        if (!newReview)
            return res.status(400).json({ message: 'Could not save review' });

        res.status(201).json({ newReview });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const findReview = async (req: Request, res: Response) => {

    const { productID, userID } = req.params;

    try {
        const previousReview = await ProductReview.findOne({ productID, userID });

        res.status(200).json({ previousReview: previousReview ?? false });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteReview = async (req: Request, res: Response) => {

    const { id: _id } = req.params;

    try {
        const deletedReview = await ProductReview.deleteOne({ _id });

        if (!deletedReview)
            return res.status(400).json({ message: 'Could not delete review' });

        res.status(200).json({ deletedReview });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchProducts = async (req: Request, res: Response) => {

    const { searchQuery } = req.query;

    if (!searchQuery)
        return res.status(422).json({ message: 'Missing search query parameter'});

    if (typeof searchQuery !== 'string')
        return res.status(422).json({ message: 'Search query must be of type string' });

    try {
        const query = new RegExp(searchQuery, 'i');

        const products = await Product.find({ $or: [ { name: query }, { 'ingridients.name': query } ] }).sort({ name: -1 });

        res.status(200).json({ products });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};