import axios from 'axios';

import { tokenService } from './token.service';

import { store } from '../app/store';

import { logout } from '../feature/auth/auth.slice';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
});

let isRefreshing = false;

let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.request.use(
    (config) => {
        const accessToken = tokenService.getAccessToken();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },

    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        const status = error.response?.status;

        const isUnauthorized = status === 401;

        const isRefreshRequest = originalRequest?.url === '/auth/refresh-tokens';

        if (isUnauthorized && !originalRequest?._retry && !isRefreshRequest) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve,
                        reject,
                    });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;

                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;

            isRefreshing = true;

            try {
                const response = await axios.post(
                    'http://localhost:3000/api/auth/refresh-tokens',
                    {},
                    {
                        withCredentials: true,
                    },
                );

                const newAccessToken = response.data.data.accessToken;

                tokenService.setAccessToken(newAccessToken);

                processQueue(null, newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);

                tokenService.clearAccessToken();

                store.dispatch(logout());

                /*
                 IMPORTANT:
                 Do NOT remove persist:root here.
                 Redux Persist should survive refreshes.
                 */

                window.location.href = '/login';

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        /*
         If refresh endpoint itself fails
         */
        if (isUnauthorized && isRefreshRequest) {
            tokenService.clearAccessToken();

            store.dispatch(logout());

            window.location.href = '/login';
        }

        return Promise.reject(error);
    },
);

export default api;
