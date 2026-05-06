import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { setCredentials } from '../feature/auth/auth.slice';

import { refreshAuth } from '../api/auth.api';

import { tokenService } from '../api/token.service';

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                console.log('hello');
                const result = await refreshAuth();
                console.log(result);

                tokenService.setAccessToken(result.data.accessToken);

                dispatch(
                    setCredentials({
                        user: result.data.user,
                    }),
                );
            } catch (error) {
                /*
                 IMPORTANT:
                 Do NOT logout here immediately.
                 Redux Persist already restored user.
                 */

                console.log('Session refresh failed:', error?.response?.data?.message);
            }
        };

        initializeAuth();
    }, [dispatch]);

    return children;
};

export default AuthProvider;
