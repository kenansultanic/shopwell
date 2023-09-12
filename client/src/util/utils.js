import leven from "leven";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo('en-US');

export const timePassed = date => timeAgo.format(new Date(date));

export const copyObject = object => JSON.parse(JSON.stringify(object));

export const compareRestrictions = (restrictions, arr2, type) => {

    let arr1 = [];
    if (type === 'allergy')
        arr1.push(...restrictions.allergies);
    else if (type === 'religious')
        arr1.push(...restrictions.religious);
    else arr1.push(...restrictions.intolerances);

    //let arr1 = restrictions.filter(item => item.type === type);

    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
}

export const searchFilter = (query, data) => {
    if (query === '') return data;
    return data.filter(element => {
        return element.name.toLowerCase().startsWith(query.trim().toLowerCase())
            || (query.length > 3 && leven(element.name, query) < 3);
    });
};

export const selectRestrictionByType = (restrictions, type) => {
    if (type === 'allergy')
        return restrictions.allergies;
    else if (type === 'religious')
        return restrictions.religious;
    return restrictions.intolerances;
};

export const checkForIngredientsWithAllergies = (ingredients, allergies) => {
    if (!ingredients || !allergies)
        return [];
    return ingredients.filter(ingredient => {
            return allergies.filter(item => {
                return ingredient.includes(item)
            }).length
        }
    );
};

export const parseResource = resource => {
    if (resource === 'product-reviews')
        return 'productReviews';
    if (resource === 'restriction-suggestions')
        return 'restrictionSuggestions';
    return resource;
};
export const getResourceTypes = () => ['users', 'products', 'product-reviews', 'restriction-suggestions', 'restrictions'];