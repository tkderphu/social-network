
import { useState } from "react"
import "./Authen.css"
import { useSelector, useDispatch } from 'react-redux'
import Spinner from "../../components/Spinner"
import { checkForgotPasswordCodeAction, forgotPasswordAction } from "../../redux/actions/profileAction"
import { Navigate, useLocation } from "react-router"
function ForgotPassworCodeScreen() {
    const [code, setCode] = useState('')
    const location = useLocation()
    
    const dispatch = useDispatch()
    const { loading, hasError, success, message } = useSelector((state: any) => {
        return state.checkForgotPasswordCode
    })
     
    const submitCheckCode = () => {
        //@ts-ignore
        dispatch(checkForgotPasswordCodeAction(code))
    }

    if(!location.state) {
        return <Navigate to={"/login"} replace={true} />
    }

    if(success) {
        return <Navigate to={"/new-password"} state={{
            code: code
        }}  replace={true} />
    }

    return (
        <div className="container mt-5" style={{ minWidth: "350px" }}>
            <h3>Forgot Password Code</h3>
            {location.state && (
                <div className="alert alert-success mt-3" role="alert">
                {location.state.message} {location.state.email}
            </div>
            )}
            {hasError && (
                <div className="alert alert-danger mt-3" role="alert">
                    {message}
                </div>
            )}
            
            <div className="form-group mb-2">
                <label htmlFor="exampleInputEmail1">Code</label>
                <input type="text" name="email" onChange={(e: any) => setCode(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter code" />
            </div>
            <Spinner loading={loading} />
            <button className="btn btn-primary w-100" onClick={() => {
                submitCheckCode()
            }}>Submit</button>
        </div>
    )
}
export default ForgotPassworCodeScreen