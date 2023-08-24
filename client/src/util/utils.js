import leven from "leven";

export const copyObject = object => JSON.parse(JSON.stringify(object));

export const compareRestrictions = (restrictions, arr2, type) => {

    let arr1 = [];
    if (type === 'allergies')
        arr1.push(...restrictions.allergies);
    else if (type === 'religious')
        arr1.push(...restrictions.religious);
    else arr1.push(...restrictions.intolerances);

    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
}

export const searchFilter = (query, data) => {
    if (query === '') return data;
    return data.filter(element => {
        return element.toLowerCase().startsWith(query.trim().toLowerCase())
            || (query.length > 3 && leven(element, query) < 3);
    });
};

export const selectRestrictionByType = (restrictions, type) => {
    if (type === 'allergies')
        return restrictions.allergies;
    else if (type === 'religious')
        return restrictions.religious;
    return restrictions.intolerances;
};

export const parseResource = resource => {
    if (resource === 'product-reviews')
        return 'productReviews';
    if (resource === 'restriction-suggestions')
        return 'restrictionSuggestions';
    return resource;
};
export const getResourceTypes = () => ['users', 'products', 'product-reviews', 'restriction-suggestions', 'restrictions'];