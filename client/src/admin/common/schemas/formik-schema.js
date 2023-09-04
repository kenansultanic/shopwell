import * as yup from "yup";

const userAdditions = {
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    email: yup.string().required('Required'),
    restriction: yup.mixed().oneOf(['allergy', 'religious', 'intolerance']),
    ingredients: yup.array().of(yup.string()).required('Required')
};

const productAdditions = {
    code: yup.string().required('Required'),
    name: yup.string().required('Required'),
    ingredients: yup.array().of(yup.string()).required('Required'),
    categories: yup.array().of(yup.string()).required('Required'),
    religiousRestrictions: yup.array().of(yup.string()).required('Required'),
    notSuitedForIntolerances: yup.array().of(yup.string()).required('Required'),
    nutritionalValuePer100grams: yup.array().of(yup.object()).required('Required'),
    calories: yup.number().required('Required'),
};

export const promoEmailSchema = yup.object().shape({
    subject: yup.string().min(5).required('Required'),
    title: yup.string().min(5).required('Required'),
    body: yup.string().min(25).required('Required'),
});

export const notificationSchema = yup.object().shape({
    tag: yup.string(),
    content: yup.string().required('Required')
});

const newUserSchema = yup.object().shape({
    ...userAdditions,
    image: yup.mixed().required('Required'),
});

const updateUserSchema = yup.object().shape({
    ...userAdditions,
    image: yup.mixed(),
});

const newProductSchema = yup.object().shape({
    ...productAdditions,
    image: yup.mixed().required('Required'),
});

const updateProductSchema = yup.object().shape({
    ...productAdditions,
    image: yup.mixed(),
});

const restrictionSchema = yup.object().shape({
    name: yup.string().required('Required'),
    type: yup.mixed().oneOf(['allergy', 'religious', 'intolerance']),
});

/*
code: string,
    name: string,
    ingridients: string[],
    nutritionalValuePer100grams: NutritionalValue[],
    category: string,
    calories: number,
    imageURL: string
* */

const initialProductValues = {
    name: '',
    code: '',
    ingredients: [],
    nutritionalValue: [],
    categories: [],
    image: null,
    calories: 0
};

const initialUserValues = {
    firstName: '',
    lastName: '',
    email: '',
    restriction: 'allergy',
    image: null,
    ingredients: []
};

const initialRestrictionValues = {
    name: '',
    type: 'allergy'
};

export const getValidationSchema = resource => {
    switch (resource) {
        case 'products-new':
            return [newProductSchema, initialProductValues];
        case 'products-edit':
            return [updateProductSchema, initialProductValues];
        case 'restrictions':
            return [restrictionSchema, initialRestrictionValues];
        default:
            return null;
    }
};
