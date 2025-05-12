import { useState } from "react"
import "./Authen.css"
import { useSelector, useDispatch } from 'react-redux'
import Alert from "../../components/Alert"
import Spinner from "../../components/Spinner"
import { createUserAction } from "../../redux/actions/profileAction"
import { useNavigate } from "react-router"
function RegisterScreen() {
    const [userCreateReq, setUserCreateReq] = useState<any>({
        isMale: true
    })

    const { loading, hasError, message, success } = useSelector((state: any) => {
        return state.createUser
    })

    const dispatch = useDispatch()

    const submitAccountRegistration = () => {
        console.log("userCreateReq object: ", userCreateReq)
        //@ts-ignore
        dispatch(createUserAction(userCreateReq))
    }



    const setState = (e: any) => {
        const { name, value } = e.target
        if(name === "isMale") {
            let tr = false
            if(value === "true") {
                tr = true
            } 
            setUserCreateReq((prev: any) => ({
                ...prev,
                [name]: tr
            }))
            return
        }
        setUserCreateReq((prev: any) => ({
            ...prev,
            [name]: value
        }))
    }
    const navigate = useNavigate()
    if(success) {
        navigate("/login", {replace: true})
    }

    return (
        <div className="container mt-5" style={{ minWidth: "350px" }}>
            <h3>Register</h3>
            {hasError && <Alert type="danger" message={message} />}
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control"
                    name="email" onChange={setState}
                    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password"
                    name="password" onChange={setState}
                    className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">First Name</label>
                <input type="text"
                    name="firstName" onChange={setState}
                    className="form-control" id="exampleInputPassword1" placeholder="First name" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Last Name</label>
                <input type="text" name="lastName" onChange={setState}
                    className="form-control" id="exampleInputPassword1" placeholder="Last name" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Date Of Birth</label>
                <input type="date" name="dateOfBirth"
                    onChange={setState}
                    className="form-control" id="exampleInputPassword1" placeholder="Date of birth" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Sex</label>
                <select className="form-control"
                    onChange={setState}
                    name="isMale" id="exampleFormControlSelect1">
                    <option value={"true"}>Male</option>
                    <option value={"false"}>Female</option>
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