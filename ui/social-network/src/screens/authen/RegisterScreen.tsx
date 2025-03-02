import "./Authen.css"

function RegisterScreen() {
    return (
        <div style={{ minWidth: "350px" }}>
            <h3>Register</h3>

            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">First Name</label>
                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="First name" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Last Name</label>
                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Last name" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Date Of Birth</label>
                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Date of birth" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Sex</label>
                <select className="form-control" id="exampleFormControlSelect1">
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>
            <div className="mb-2 d-flex justify-content-between">
                <a href="/login">Login</a>
                <a href="/forgot-password">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-primary" onClick={(e) => {
                e.preventDefault()
            }}>Submit</button>
        </div>
    )
}
export default RegisterScreen