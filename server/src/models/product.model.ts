import mongoose from "mongoose";

type NutritionalValue = {
    name: string,
    value: number
};

export interface ProductDocument extends mongoose.Document {
    code: string,
    name: string,
    ingredients: string[],
    nutritionalValuePer100grams: NutritionalValue[],
    category: string[],
    religiousRestrictions: string[],
    notSuitedForIntolerances: string[],
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
    ingredients: {
        type: [{
            type: String,
            required: true
        }],
        required: true
    },
    religiousRestrictions: [{
        type: String,
        required: true
    }],
    notSuitedForIntolerances: [{
        type: String,
        required: true
    }],
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
        /*validate: {
            validator: (v: NutritionalValue[]) => {
                console.log(v)
                const sum = v.reduce((acc, a) => acc + a.value, 0);
                console.log(sum)
                return sum <= 100 && sum > 99;
            },
            message: 'Sum of all items must sum up to exactly 100 grams'
        },*/
        required: true
    },
    categories: [{
        type: String,
        required: true
    }],
    calories: {
        type: Number
    },
    imageURL: {
        type: String
    }
});

const Product = mongoose.model<ProductDocument>('product', ProductSchema);

export default Product;