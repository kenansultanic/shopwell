import * as api from "../api/admin";
import {appendRestrictions, deleteResources} from "../state/dataSlice";

export const getRestrictions = (page, limit) => async dispatch => {

    try {
        const { data: { resources: restrictions, total } } = await api.getResources(page, limit, 'restrictions');

        dispatch(appendRestrictions({ restrictions }));

        return { total };
    }
    catch (error) {
        console.error(error.message);
    }
};

export const getRestriction = id => async dispatch => {

    const response = await api.getResource(id, 'restrictions');
    const restriction = response?.data?.resource;

    if (!restriction) return;

    dispatch(appendRestrictions({ restrictions: [restriction] }));
};

export const deleteRestrictions = (IDs, resourceType) => async dispatch => {

    const str = IDs.join(',');

    const response = await api.deleteResources('restrictions', str);

    if (response.status === 200)
        dispatch(deleteResources({ IDs, resourceType }));
};

