
import { useState } from "react"
import "./Authen.css"
import { useSelector, useDispatch } from 'react-redux'
import { forgotPasswordAction } from "../../redux/actions/authAction"
import Spinner from "../../components/Spinner"
function ForgotPassworScreen() {
    const [email, setEmail] = useState('')

    
    const dispatch = useDispatch()
    const { loading, hasError, message } = useSelector((state: any) => {
        return state.forgotPassword
    })
     
    const submitForgotPassword = () => {
        //@ts-ignore
        dispatch(forgotPasswordAction(email))
    }

    return (
        <div className="container mt-5" style={{ minWidth: "350px" }}>
            <h3>Forgot Password</h3>
            {hasError && (
                <div className="alert alert-danger mt-3" role="alert">
                    {message}
                </div>
            )}
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" name="email" onChange={(e: any) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="mb-2 d-flex justify-content-between">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>
            <Spinner loading={loading} />
            <button className="btn btn-primary w-100" onClick={() => {
                submitForgotPassword()
            }}>Submit</button>
        </div>
    )
}
export default ForgotPassworScreen