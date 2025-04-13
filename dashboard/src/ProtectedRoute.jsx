import { useAuth } from "./AuthContext";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            console.log("User in ProtectedRoute:", user);
            if (!user) {
                navigate("/login");
            }
        }
    }, [user, loading]);

    if (loading) return <div>Loading...</div>;

    return user ? <Outlet /> : null;
}

export default ProtectedRoute;
