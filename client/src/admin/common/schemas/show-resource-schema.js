
const userSchema = [
    { field: '_id', headerName: 'ID', type: 'string' },
    { field: 'firstName', headerName: 'First Name', type: 'string' },
    { field: 'lastName', headerName: 'Last Name', type: 'string' },
    { field: 'email', headerName: 'Email', type: 'string' },
    { field: 'extraEmails', headerName: 'Extra emails', type: 'bool' },
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
            return //productSchema;
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