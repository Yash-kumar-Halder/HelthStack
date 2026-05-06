import { Navigate, Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';

const ProtectedLayout = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return <Outlet />;
};

export default ProtectedLayout;
