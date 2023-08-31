
const userSchema = [
    //{ field: '_id', headerName: 'ID', type: 'string' },
    { field: 'firstName', headerName: 'First Name', type: 'string', required: true },
    { field: 'lastName', headerName: 'Last Name', type: 'string', required: true },
    { field: 'image', headerName: 'Image', type: 'file', required: true, value: null },
    { field: 'email', headerName: 'Email', type: 'string', required: true, multiline: true },
    { field: 'ingredients', headerName: 'Ingredients', type: 'multiple-string', required: true},
    { field: 'restriction', headerName: 'Restriction', type: 'enum', required: true,
        options: [
            { value: 'allergy', label: 'Allergy' },
            { value: 'religious', label: 'Religious' },
            { value: 'intolerance', label: 'Intolerance' },
        ]
    }
    //{ field: 'extraEmails', headerName: 'Extra emails', type: 'bool' },
];

const restrictionSchema = [
    { field: 'name', headerName: 'Name', type: 'string', required: true },
    { field: 'type', headerName: 'Type', type: 'enum', required: true,
        options: [
            { value: 'allergy', label: 'Allergy' },
            { value: 'religious', label: 'Religious' },
            { value: 'intolerance', label: 'Intolerance' },
        ]
    },
];

export const getNewResourceSchema = resource => {
    switch (resource) {
        case 'users':
            return userSchema;
        case 'restrictions':
            return restrictionSchema;
        default:
            return null;
    }
};