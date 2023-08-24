import mongoose from "mongoose";

type NutritionalValue = {
    name: string,
    value: number
};

export interface ProductDocument extends mongoose.Document {
    code: string,
    name: string,
    ingridients: string[],
    nutritionalValuePer100grams: NutritionalValue[],
    category: string,
    calories: number,
    imageURL: string
};

const ProductSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    ingridients: {
        type: [{
            type: String,
            required: true
        }],
        required: true
    },
    nutritionalValuePer100grams: {
        type: [{
            name: {
                type: String,
                required: true
            },
            value: {
                type: Number,
                min: .0001,
                max: 100,
                required: true
            }
        }],
        validate: {
            validator: (v: NutritionalValue[]) => {
                const sum = v.reduce((acc, a) => acc + a.value, 0);
                return sum <= 100 && sum > 99;
            },
            message: 'Sum of all items must sum up to exactly 100 grams'
        },
        required: true
    },
    category: {
        type: String,
        required: true
    },
    calories: {
        type: Number
    },
    imageURL: {
        type: String
    }
});

const Product = mongoose.model<ProductDocument>('product', ProductSchema);

export default Product;