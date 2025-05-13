
import { useState } from "react"
import "./Authen.css"
import { useSelector, useDispatch } from 'react-redux'
import Spinner from "../../components/Spinner"
import { createNewPasswordAction, forgotPasswordAction } from "../../redux/actions/profileAction"
import { Navigate, useLocation } from "react-router"
import { UserUpdateNewPassword } from "../../services/profile/profileService"
function CreateNewPasswordScreen() {
    const location = useLocation()
    if(!location.state || !location.state.code) {
        return <Navigate to={"/login"} replace={true} />
    }
    const [userUpdateNewPassword, setUserUpdateNewPassword] = useState<any>({
        codeForgotPassword: location.state.code,
        newPassword: ""
    })
    
    const dispatch = useDispatch()
    const { loading, hasError, message, success } = useSelector((state: any) => {
        return state.createNewPassword
    })
     
    const submitUpdateNewPassword = () => {
        //@ts-ignore
        // dispatch(forgotPasswordAction(email))
        if(userUpdateNewPassword.newPassword != userUpdateNewPassword.reNewPassword) {
            alert("Please enter again new password")
            return;
        }
        //@ts-ignore
        dispatch(createNewPasswordAction({...userUpdateNewPassword}))
    }



    if(success) {
        return <Navigate to={"/login"}  replace={true} />
    }

    return (
        <div className="container mt-5" style={{ minWidth: "350px" }}>
            <h3>Create new password</h3>
            {hasError && (
                <div className="alert alert-danger mt-3" role="alert">
                    {message}
                </div>
            )}
            <div className="form-group mb-2">
                <label htmlFor="exampleInputEmail1">New password</label>
                <input type="email" name="email" onClick={(e: any) => {
                    setUserUpdateNewPassword((prev: any) => ({
                        ...prev,
                        'newPassword': e.target.value
                    }))
                }}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter new password" />
            </div>
            <div className="form-group mb-2">
                <label htmlFor="exampleInputEmail1">Enter again new password</label>
                <input type="email" name="email" onClick={(e: any) => {
                      setUserUpdateNewPassword((prev: any) => ({
                        ...prev,
                        'reNewPassword': e.target.value
                    }))
                }}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter again new password" />
            </div>
            <Spinner loading={loading} />
            <button className="btn btn-primary w-100" onClick={() => {
                submitUpdateNewPassword()
            }}>Submit</button>
        </div>
    )
}
export default CreateNewPasswordScreen