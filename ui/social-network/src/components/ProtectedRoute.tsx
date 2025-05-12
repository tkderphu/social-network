import { Navigate, Outlet } from "react-router";
import { TokenUtils } from "../common";

export default function ProtectedRoute() {
    console.log("token: ", TokenUtils)
    if(TokenUtils.tokenIsExpired) {
        return <Navigate to={"/login"} />
    }

    return <Outlet/>
}