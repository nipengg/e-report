import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ user, children, redirectPath = '/login', }) => {
    console.log(user)
    if (!user.length) {
        console.log('anjing')
        return <Navigate to={redirectPath} replace />
    }

    return children;
};

export default ProtectedRoutes;
