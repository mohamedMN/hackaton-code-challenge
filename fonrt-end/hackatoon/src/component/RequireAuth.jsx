import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/useContex";

const RequireAuth = () => {
  const { auth } = useContext(AuthContext);

  console.log("auth " + JSON.stringify(auth));
  var location = useLocation();
  if (!location) {
    location = "/";
  }
  return auth.isEmpty ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
