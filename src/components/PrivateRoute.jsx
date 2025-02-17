import { useEffect } from 'react';
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "./AuthProvider";
import isEmpty from '../utils/isEmpty';

export default function PrivateRoute() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && isEmpty(user)) {
            navigate("/auth");
        }
    }, [loading, user, navigate]);

    if (loading) return null;

    return !isEmpty(user) ? <Outlet /> : null;
};
