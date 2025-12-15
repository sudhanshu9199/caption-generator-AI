import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export const PublicRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};
