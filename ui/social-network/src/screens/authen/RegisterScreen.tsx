import { useState } from "react"
import { AuthRegisterReqVO } from "../../model/authModel"
import "./Authen.css"
import {useSelector, useDispatch} from 'react-redux'
import { registerAction } from "../../redux/actions/authAction"
import Alert from "../../components/Alert"
import Spinner from "../../components/Spinner"
import { setState } from "../../common"
function RegisterScreen() {
    const [authRegisterReq, setAuthRegisterReq] = useState<AuthRegisterReqVO>({
        sex: 'MALE'
    })

    const {loading, hasError, message} = useSelector((state: any) => {
        return state.register
    })

    const dispatch = useDispatch()

    const submitAccountRegistration = () => {
        console.log("req: ", authRegisterReq)
        //@ts-ignore
        dispatch(registerAction(authRegisterReq))
    }

    return (
        <div className="container mt-5" style={{ minWidth: "350px" }}>
            <h3>Register</h3>
            {hasError && <Alert type="danger" message={message} />}
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" 
                name="email" onChange={(e: any) => setState(e, setAuthRegisterReq)}
                id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password"
                name="password" onChange={(e: any) => setState(e, setAuthRegisterReq)}
                className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">First Name</label>
                <input type="text" 
                name="firstName" onChange={(e: any) => setState(e, setAuthRegisterReq)}
                className="form-control" id="exampleInputPassword1" placeholder="First name" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Last Name</label>
                <input type="text" name="lastName" onChange={(e: any) => setState(e, setAuthRegisterReq)}
                className="form-control" id="exampleInputPassword1" placeholder="Last name" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Date Of Birth</label>
                <input type="text" name="dateOfBirth" 
                onChange={(e: any) => setState(e, setAuthRegisterReq)}
                className="form-control" id="exampleInputPassword1" placeholder="Date of birth" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Sex</label>
                <select className="form-control" 
                onChange={(e: any) => setState(e, setAuthRegisterReq)}
                name="sex" id="exampleFormControlSelect1">
                    <option value={"MALE"}>Male</option>
                    <option value={"FEMALE"}>Female</option>
                </select>
            </div>
            <div className="mb-2 d-flex justify-content-between">
                <a href="/login">Login</a>
                <a href="/forgot-password">Forgot password?</a>
            </div>
            <Spinner loading={loading} />
            <button type="submit" className="btn btn-primary w-100" onClick={(e) => {
               submitAccountRegistration()
            }}>Submit</button>
        </div>
    )
}
export default RegisterScreen