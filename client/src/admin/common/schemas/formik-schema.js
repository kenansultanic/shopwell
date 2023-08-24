import * as yup from "yup";

const userAdditions = {
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    email: yup.string().required('Required'),
    restriction: yup.mixed().oneOf(['allergy', 'religious', 'intolerance']),
};

export const promoEmailSchema = yup.object().shape({
    subject: yup.string().min(5).required('Required'),
    title: yup.string().min(5).required('Required'),
    body: yup.string().min(25).required('Required'),
});

const newUserSchema = yup.object().shape({
    ...userAdditions,
    image: yup.mixed().required('Required'),
});

const updateUserSchema = yup.object().shape({
    ...userAdditions,
    image: yup.mixed(),
});

const restrictionSchema = yup.object().shape({
    name: yup.string().required('Required'),
    type: yup.mixed().oneOf(['allergy', 'religious', 'intolerance']),
});

const initialUserValues = {
    firstName: '',
    lastName: '',
    email: '',
    restriction: 'allergy',
    image: null
};

const initialRestrictionValues = {
    name: '',
    type: 'allergy'
}

export const getValidationSchema = resource => {
    switch (resource) {
        case 'users-new':
            return [newUserSchema, initialUserValues];
        case 'users-edit':
            return [newUserSchema, initialUserValues];
        case 'restrictions':
            return [restrictionSchema, initialRestrictionValues];
        default:
            return null;
    }
};
