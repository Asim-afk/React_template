/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

function PrivateRoute({ children }) {
  const { userData } = useAuthStore();
  return userData.isLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
