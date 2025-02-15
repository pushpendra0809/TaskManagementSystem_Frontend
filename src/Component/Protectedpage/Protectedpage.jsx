import { Navigate, Outlet } from "react-router-dom";

const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user")); 
  return user?.Userrole; 
};

const Protectedpage = () => {
  const role = getUserRole();

  return role === "Admin" ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Protectedpage;
