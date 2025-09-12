import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
    const isAuthenticated = Cookies.get("accessToken");
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;

}
export default PrivateRoute;