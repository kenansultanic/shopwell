import randomstring from "randomstring";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import Product from "../models/product.model";
import ProductReviews from "../models/productReview.model";
import Restriction from "../models/restrictions/restriction.model";
import RestrictionSuggestion from "../models/restrictions/restrictionSuggestion.model";
import DataURIParser from "datauri/parser";


export const generateCode = () => randomstring.generate({ length: 6 });

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
};

export const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const dataUriFormatter = (name: string, file: Buffer) => {
    const parser = new DataURIParser();
    return parser.format(name.slice(-4), file).content;
};

export const getResourceModel = (resource: string) /*: MongooseModel */ => {
    switch (resource) {
        case 'users':
            return User;
        case 'products':
            return Product;
        case 'product-reviews':
            return ProductReviews;
        case 'restrictions':
            return Restriction;
        case 'restriction-suggestions':
            return RestrictionSuggestion;
        default:
            return null;
    };
};