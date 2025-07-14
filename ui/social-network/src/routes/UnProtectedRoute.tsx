import { Route, Routes } from "react-router";
import CreateNewPasswordScreen from "../screens/authen/CreateNewPasswordScreen";
import ForgotPassworCodeScreen from "../screens/authen/ForgotPasswordCodeScreen";
import ForgotPassworScreen from "../screens/authen/ForgotPasswordScreen";
import LoginScreen from "../screens/authen/LoginScreen";
import RegisterScreen from "../screens/authen/RegisterScreen";

export default function UnProtectedRoute() {
    return (
        <Routes>
            <Route path='login' element={<LoginScreen />}></Route>
            <Route path='register' element={<RegisterScreen />}></Route>
            <Route path='forgot-password' element={<ForgotPassworScreen />} />
            <Route path='forgot-password-code' element={<ForgotPassworCodeScreen />} />
            <Route path='new-password' element={<CreateNewPasswordScreen />} />
        </Routes>
    )
}