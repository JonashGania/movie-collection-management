import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet/> : <Navigate to="/sign-in"/>
}

export default ProtectedRoutes