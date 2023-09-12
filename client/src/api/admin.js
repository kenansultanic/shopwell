import { axiosClient as axios } from "./AxiosClient";

export const getStatistics = () => axios.get('/admin/statistics');

export const getResources = (page, limit, type) => axios.get(`/admin/${type}`, { params: { page, limit } });

export const getNumberOfResources = resource => axios.get(`/admin/get-number-of-${resource}`);

export const getResource = (id, type) => axios.get(`/admin/${type}/${id}`);

export const saveResource = (fields, type) => {
    const values = JSON.stringify(fields);
    return axios.post(
        `/admin/${type}`,
        { values, image: fields.image },
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );
};

export const editResource = (fields, type, id) => {
    const values = JSON.stringify(fields);
    return axios.patch(
        `/admin/${type}/${id}`,
        { values, image: fields.image },
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );
};

export const deleteResources = (type, ids) => axios.delete(`/admin/${type}`, { params: { ids } } );

export const sendPromoEmail = mailContents => axios.post('/admin/send-promotional-email', { ...mailContents });