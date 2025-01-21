import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  loggedIn: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ loggedIn, children }) => {
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
