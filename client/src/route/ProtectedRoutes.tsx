import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const ProtectedRoutes = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>
    }

    return isAuthenticated ? <Outlet/> : <Navigate to="/sign-in"/>
}

export default ProtectedRoutes