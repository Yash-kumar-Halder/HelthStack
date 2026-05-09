import api from './axios';

// Get all rooms with optional filters
export const fetchRooms = async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.wardId) params.append('wardId', filters.wardId);
    if (filters.status) params.append('status', filters.status);

    const response = await api.get(`/rooms?${params.toString()}`);
    return response.data.data;
};

// Get single room details
export const fetchRoomById = async (roomId) => {
    const response = await api.get(`/rooms/${roomId}`);
    return response.data.data;
};

// Create new room
export const createRoom = async (roomData) => {
    const response = await api.post('/rooms', roomData);
    return response.data.data;
};

// Update room
export const updateRoom = async (roomId, roomData) => {
    const response = await api.patch(`/rooms/${roomId}`, roomData);
    return response.data.data;
};

// Delete room
export const deleteRoom = async (roomId) => {
    const response = await api.delete(`/rooms/${roomId}`);
    return response.data.data;
};
