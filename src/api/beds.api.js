import api from './axios';

// Get bed availability with optional filters
export const fetchBedAvailability = async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.wardId) params.append('wardId', filters.wardId);
    if (filters.roomId) params.append('roomId', filters.roomId);

    const response = await api.get(`/beds/availability?${params.toString()}`);
    return response.data.data;
};

// Get all beds with optional filters
export const fetchBeds = async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.wardId) params.append('wardId', filters.wardId);
    if (filters.roomId) params.append('roomId', filters.roomId);
    if (filters.status) params.append('status', filters.status);

    const response = await api.get(`/beds?${params.toString()}`);
    return response.data.data;
};

// Get single bed details
export const fetchBedById = async (bedId) => {
    const response = await api.get(`/beds/${bedId}`);
    return response.data.data;
};

// Create new bed
export const createBed = async (bedData) => {
    const response = await api.post('/beds', bedData);
    return response.data.data;
};

// Update bed
export const updateBed = async (bedId, bedData) => {
    const response = await api.patch(`/beds/${bedId}`, bedData);
    return response.data.data;
};

// Delete bed
export const deleteBed = async (bedId) => {
    const response = await api.delete(`/beds/${bedId}`);
    return response.data.data;
};
