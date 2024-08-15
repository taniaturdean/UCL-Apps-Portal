import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // Outlet here represents any child components of RequireAuth
  return (
    // If the auth roles array matches the allowed roles, return the outlet, else:
    // (if the user is logged in, navigate to forbidden else, navigate to unauthorised page)
    auth?.roles?.find((role) => allowedRoles.includes(role)) ? (
      <Outlet />
    ) : auth?.user ? (
      <Navigate to="/Forbidden" state={{ from: location }} replace />
    ) : (
      <Navigate to="/Unauthorised" state={{ from: location }} replace />
    )
    // Navigate to homepage and set "from" to current location (protected route user is trying to access)
    // replace current location in history stack so user can't go back to protected route without logging in
  );
};

export default RequireAuth;
