import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const auth = ; // user
  // console.log("auth " + JSON.stringify(auth));
  var location = useLocation();
  if (!location) {
    location = "/home";
  }
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
