import http from '../http-common';

export const getAllColors = () => {
    return http.get('/listGradients');
};

export const getColor = (id) => {
    return http.get(`/listGradients/${id}`);
};

export const createColor = (data) => {
    return http.post('/listGradients', data);
};

export const updateColor = (id, data) => {
    return http.put(`/listGradients/${id}`, data);
};

export const removeColor = (id) => {
    return http.delete(`/listGradients/${id}`);
};