import api from './axios';

// Get single user details
export const fetchUserById = async (userId) => {
    const response = await api.get(`/users/${userId}`);

    return response.data.data;
};

// Create new user
export const createUser = async (userData) => {
    const response = await api.post('/users', userData);

    return response.data.data;
};

// Update user
export const updateUser = async (userId, userData) => {
    const response = await api.patch(`/users/${userId}`, userData);

    return response.data.data;
};

// Delete user
export const deleteUser = async (userId) => {
    const response = await api.delete(`/users/${userId}`);

    return response.data.data;
};
