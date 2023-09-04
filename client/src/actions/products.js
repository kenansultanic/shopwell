import * as api from "../api/user";
import {appendResources, deleteResources} from "../state/dataSlice";

const resourceType = 'products';

export const getProduct = id => async dispatch => {

    const response = await api.getProduct(id);
    const product = response.data.product;

    dispatch(appendResources({ resources: [product], resourceType }));

    return response;
};

export const leaveReview = (code, userID, rating, comment, name) => async dispatch => {

    const response = await api.leaveReview(code, userID, rating, comment, name);
    const review = response.data.newReview;

    dispatch(appendResources({ resources: [review], resourceType: 'product-reviews' }));

    return response;
};

export const getReviews = (code, page) => async dispatch => {

    const response = await api.getReviews(code, page);
    const { reviews: resources } = response.data;

    dispatch(appendResources({ resources, resourceType: 'product-reviews' }));

    return response;
};

export const deleteReview = id => async dispatch => {

    const response = await api.deleteReview(id);

    if (response.status === 200)
        dispatch(deleteResources({ IDs: [id], resourceType: 'product-reviews' }));

    return response;
};