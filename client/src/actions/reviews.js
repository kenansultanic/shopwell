import * as api from "../api/user";
import {appendResources} from "../state/dataSlice";

const resourceType = 'reviews';


export const getProduct = id => async dispatch => {

    const response = await api.getProduct(id);
    const product = response.data.product;

    dispatch(appendResources({ resources: [product], resourceType }));

    return response;
};