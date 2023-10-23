import React, { useContext, useEffect } from "react";
import { authContext } from "../../Context/authentication";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(authContext);

  
  if (localStorage.getItem("tkn") !== null) {
    console.log("done");
  } else if (token === null) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
