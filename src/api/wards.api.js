import api from './axios';

// Get all wards
export const fetchWards = async () => {
    const response = await api.get('/wards');
    return response.data.data;
};

// Get single ward details
export const fetchWardById = async (wardId) => {
    const response = await api.get(`/wards/${wardId}`);
    return response.data.data;
};

// Create new ward
export const createWard = async (wardData) => {
    const response = await api.post('/wards', wardData);
    return response.data.data;
};

// Update ward
export const updateWard = async (wardId, wardData) => {
    const response = await api.patch(`/wards/${wardId}`, wardData);
    return response.data.data;
};

// Delete ward
export const deleteWard = async (wardId) => {
    const response = await api.delete(`/wards/${wardId}`);
    return response.data.data;
};
