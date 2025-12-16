import { Navigate } from "react-router-dom";

export const RequireRoleRedirect = () => {
  const userStr = localStorage.getItem("user");

  if (!userStr) return <Navigate to="/home" replace />;

  try {
    const user = JSON.parse(userStr);
    if (Number(user.role) === 1) return <Navigate to="/admin/report" replace />; // admin
    return <Navigate to="/home" replace />; // customer
  } catch {
    return <Navigate to="/home" replace />;
  }
};
