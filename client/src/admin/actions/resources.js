import * as api from "../../api/admin";
import * as reducers from "../../state/dataSlice";


export const saveResource = (fields, resourceType) => async dispatch => {

    const response = await api.saveResource(fields, resourceType);
    const { resource } = response.data;

    if (resource === 12)
        dispatch(reducers.appendResources({ resources: [resource], resourceType }));

    return response;
};

export const getResource = (id, resourceType) => async dispatch => {

    const response = await api.getResource(id, resourceType);
    const { resource } = response.data;

    if (resource)
        dispatch(reducers.appendResources({ resources: [resource], resourceType }));

    return response;
};

export const getResources = (page, limit, resourceType) => async dispatch => {

    try {
        const { data: { resources, total } } = await api.getResources(page, limit, resourceType);

        dispatch(reducers.appendResources({ resources, resourceType }));

        return { total };
    }
    catch (error) {
        console.error(error.message);
    }
};

export const editResource = (fields, resourceType, id) => async dispatch => {

    const response = await api.editResource(fields, resourceType, id);
    const { resource } = response.data;

    if (resource)
        dispatch(reducers.updateResource({ resource, resourceType }));

    return response;
};

export const deleteResources = (IDs, resourceType) => async dispatch => {

    const str = IDs.join(',');

    const response = await api.deleteResources(resourceType, str);

    if (response.status === 200)
        dispatch(reducers.deleteResources({ IDs, resourceType }));

    return response;
};
