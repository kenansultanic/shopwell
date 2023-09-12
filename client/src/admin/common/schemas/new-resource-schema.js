

const productSchema = [
    { field: 'code', headerName: 'Code', type: 'string' },
    { field: 'name', headerName: 'Name', type: 'string' },
    { field: 'calories', headerName: 'Calories', type: 'string' },
    { field: 'imageURL', headerName: 'Image', type: 'image' },
    { field: 'ingredients', headerName: 'Ingredients', type: 'multiple-string'},
    { field: 'categories', headerName: 'Categories', type: 'multiple-string'},
    { field: 'notSuitedForIntolerances', headerName: 'Not Suited for Intolerances', type: 'multiple-string'},
    { field: 'religiousRestrictions', headerName: 'Religious restrictions', type: 'multiple-string'},
    { field: 'nutritionalValuePer100grams', headerName: 'Nutritional value per 100g', type: 'multiple-string'},
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
        case 'products':
            return productSchema;
        case 'restrictions':
            return restrictionSchema;
        default:
            return null;
    }
};