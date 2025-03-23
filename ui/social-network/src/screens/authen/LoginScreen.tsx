import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { setState } from "../../common"
import Alert from "../../components/Alert"
import Spinner from "../../components/Spinner"
import { AuthLoginReqVO } from "../../model/authModel"
import { loginAction } from "../../redux/actions/authAction"
import "./Authen.css"

function LoginScreen() {
    const [authLoginReq, setAuthLoginReq] = useState<AuthLoginReqVO>()

    const { loading, hasError, message } = useSelector((state: any) => {
        return state.login
    })

    const dispatch = useDispatch()

    const login = () => {
        console.log("req: ", authLoginReq)
        // @ts-ignore
        dispatch(loginAction(authLoginReq))
    }

    return (
        <div className="container mt-5" style={{ minWidth: "350px" }}>
            <h3>Login</h3>
            {hasError && <Alert type="danger"  message={message}/>}
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" 
                name='email' onChange={(e: any) => setState(e, setAuthLoginReq)}
                aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" 
                name='password' onChange={(e: any) => setState(e, setAuthLoginReq)}
                id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="mb-2 d-flex justify-content-between">
                <a href="/register">Register</a>
                <a href="/forgot-password">Forgot password?</a>
            </div>
            <Spinner loading={loading} />
            <button  className="btn btn-primary w-100" onClick={() => {
                login()
            }}>Submit</button>
        </div>
    )
}
export default LoginScreen