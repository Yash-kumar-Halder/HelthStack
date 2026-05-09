import api from './axios.js';
import { tokenService } from './token.service';

export const loginUser = async (data) => {
    const response = await api.post('/auth/login', data);

    const accessToken = response.data.data.accessToken;

    tokenService.setAccessToken(accessToken || null);

    return response.data;
};

export const logoutUser = async () => {
    const response = await api.post('/auth/logout');

    tokenService.setAccessToken(null);

    return response.data;
};

export const registerUser = async (data) => {
    const response = await api.post('/auth/register', data);

    const accessToken = response.data.data.accessToken;

    tokenService.setAccessToken(accessToken);

    return response.data;
};

export const refreshAuth = async () => {
    const response = await api.post('/auth/refresh-tokens');

    return response.data;
};

export const fetchUser = async (data) => {
    const response = await api.post('/auth/login', data);

    const accessToken = response.data.data.accessToken;

    tokenService.setAccessToken(accessToken || null);

    return response.data;
};
