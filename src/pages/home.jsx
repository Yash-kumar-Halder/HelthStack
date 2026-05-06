import { useSelector } from 'react-redux';

const Home = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <p>Please login</p>;
    }

    return (
        <div>
            <h1>Welcome {user?.name}</h1>

            <p>Email: {user?.email}</p>
        </div>
    );
};

export default Home;
