import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { currentUser } = useAuthContext();

  if (!currentUser) {
    return <Navigate to="/login"></Navigate>;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
