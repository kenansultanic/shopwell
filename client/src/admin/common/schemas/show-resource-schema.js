
const userSchema = [
    { field: '_id', headerName: 'ID', type: 'string' },
    { field: 'firstName', headerName: 'First Name', type: 'string' },
    { field: 'lastName', headerName: 'Last Name', type: 'string' },
    { field: 'email', headerName: 'Email', type: 'string' },
    { field: 'image', headerName: 'Image', type: 'file' },
    { field: 'extraEmails', headerName: 'Extra emails', type: 'bool' },
];

const productSchema = [
    { field: '_id', headerName: 'ID', type: 'string' },
    { field: 'code', headerName: 'Code', type: 'string' },
    { field: 'name', headerName: 'Name', type: 'string' },
    { field: 'imageURL', headerName: 'Image', type: 'image' },
    { field: 'ingredients', headerName: 'Ingredients', type: 'multiple-string'},
    { field: 'categories', headerName: 'Categories', type: 'multiple-string'},
    { field: 'notSuitedForIntolerances', headerName: 'Not Suited for Intolerances', type: 'multiple-string'},
    { field: 'religiousRestrictions', headerName: 'Religious restrictions', type: 'multiple-string'},
    { field: 'nutritionalValuePer100grams', headerName: 'Nutritional value per 100g', type: 'nutritional-value'},
];

const restrictionSchema = [
    { field: '_id', headerName: 'ID', type: 'string' },
    { field: 'name', headerName: 'Name', type: 'string' },
    { field: 'type', headerName: 'Type', type: 'string' },
];

export const getShowResourceSchema = resource => {
    switch (resource) {
        case 'users':
            return userSchema;
        case 'products':
            return productSchema;
        case 'product-reviews':
            return //productReviewSchema;
        case 'restrictions':
            return restrictionSchema;
        case 'restriction-suggestions':
            return //restrictionSuggestionSchema;
        default:
            return //restrictionSchema;
    }
};