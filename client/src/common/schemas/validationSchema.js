import * as yup from 'yup';

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const password = yup
    .string()
    .min(8)
    .max(25)
    .matches(passwordRegex, { message: 'Please choose a stronger password' })
    .required('Required');

export const initialSignupValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    allowExtraEmails: false
};

export const initialSigninValues = {
    email: '',
    password: '',
    rememberMe: false
};

export const validationSchema = yup.object().shape({
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    email: yup.string().email('Please enter a valid email').required('Required'),
    password: yup
        .string()
        .min(8)
        .max(25)
        .matches(passwordRegex, {message: 'Please choose a stronger password'})
        .required('Required'),
    allowExtraEmails: yup.bool()
});

export const signinSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Required'),
    password: yup
        .string()
        .min(8)
        .max(25)
        .matches(passwordRegex, {message: 'Please choose a stronger password'})
        .required('Required'),
    rememberMe: yup.bool()
});

export const emailSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Required')
});

export const resetCodeSchema = yup.object().shape({
    code: yup
        .string()
        .min(6, 'Must be a six digit number')
        .max(6, 'Must be a six digit number')
        .required('Required'),
    password: yup
        .string()
        .min(8)
        .max(25)
        .matches(passwordRegex, {message: 'Please choose a stronger password'})
        .required('Required')
});

export const updateUserInfoSchema = yup.object().shape({
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    email: yup.string().email('Please enter a valid email').required('Required'),
});

export const updateUserPasswordSchema = yup.object().shape({
    oldPassword: yup.string().required('Required'),
    newPassword: password
});

export const suggestRestrictionSchema = yup.object().shape({
    name: yup.string().required('Required'),
    type: yup.string().oneOf(['allergy', 'religious', 'intolerance']).required('Required'),
    description: yup.string().notRequired()
});

export const leaveReviewSchema = yup.object().shape({
    comment: yup.string()
});