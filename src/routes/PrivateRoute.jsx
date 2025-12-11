import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, loading, role } = useAuth();
  const location = useLocation();

  // Wait until get user + role
  if (loading) return <LoadingSpinner />;

  // Not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If route requires a role
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Everything ok
  return children;
};

export default PrivateRoute;
