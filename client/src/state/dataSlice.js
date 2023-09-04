import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    products: [],
    'product-reviews': [],
    restrictions: [],
    'restriction-suggestions': [],
    statistics: null
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setUsers: (state, action) => { state.users = action.payload.users; },
        appendUsers: (state, action) => {state.users = [...state.users, ...action.payload.users]; },
        setProducts: (state, action) => { state.products = action.payload.products; },
        setProductReviews: (state, action) => { state['product-reviews'] = action.payload.productReviews; },
        setRestrictions: (state, action) => { state.restrictions = action.payload.restrictions; },
        appendRestrictions: (state, action) => { state.restrictions = [...state.restrictions, ...action.payload.restrictions]; },
        setRestrictionSuggestions: (state, action) => { state.restrictionSuggestions = action.payload.restrictionSuggestions; },

        setStatistics: (state, action) => { state.statistics = { ...action.payload } },
        updateRestriction: (state, action) => {
            const index = state.restrictions.findIndex(item => item._id === action.payload.restriction._id);
            if (index === -1)
                state.restrictions.push(action.payload.restriction);
            else state.restrictions[index] = action.payload.restriction;
        },
        appendResources: (state, action) => {
            const { resources, resourceType } = action.payload;
            resources.forEach(resource => {
                const index = state[resourceType].findIndex(item => item._id === resource._id);
                if (index === -1)
                    state[resourceType].push(resource);
            });
            //state[resourceType] = [...state[resourceType], ...resources];
        },
        updateResource: (state, action) => {
            const { resource, resourceType } = action.payload;
            const index = state[resourceType].findIndex(item => item._id === resource._id);
            if (index === -1)
                state[resourceType].push(resource);
            else state[resourceType][index] = resource;
        },
        deleteResources: (state, action) => {
            const { IDs, resourceType } = action.payload;
            state[resourceType] = state[resourceType].filter(item => !IDs.includes(item._id))
        },
    }
});

export const {
    setUsers,
    appendUsers,
    setProducts,
    setProductReviews,
    setStatistics,
    setRestrictions,
    appendRestrictions,
    updateRestriction,
    appendResources,
    updateResource,
    deleteResources,
    setRestrictionSuggestions
} = dataSlice.actions;

export const selectUsers = state => state.data.users;

export const selectUserByID = (state, equalityFn) => state.data.users.find(equalityFn);

export const selectProducts = state => state.data.products;

export const selectRestrictions = state => state.data.restrictions;

export const selectStatistics = state => state.data.statistics;

export default dataSlice.reducer;