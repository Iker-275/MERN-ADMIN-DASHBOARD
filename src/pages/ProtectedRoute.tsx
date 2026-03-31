

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute() {

  const {  token} = useAuth();
  

  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  
  return <Outlet />;
}


 function AuthRoute() {

  const {  token} = useAuth();

  

  if (token) {
    return <Navigate to="/" replace />;
  }
  
  

  return <Outlet />;
}

export{AuthRoute,ProtectedRoute}