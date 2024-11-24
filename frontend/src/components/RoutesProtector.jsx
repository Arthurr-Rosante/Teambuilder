import { Navigate } from "react-router-dom";
import { useUser } from '../contexts/UserContext.jsx';

const RoutesProtector = ({ children }) => {
    const { user, loading } = useUser();

    if (loading) {
        return <div id="loading"></div>;
    }

    if (!user) {
        return <Navigate to="/authenticate/login" />;
    }

    return children;
};

export default RoutesProtector;