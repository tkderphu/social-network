import "./Authen.css"

function LoginScreen() {
    return (
        <div  style={{minWidth: "350px"}}>
            <h3>Login</h3>
            
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="mb-2 d-flex justify-content-between">
                <a href="/register">Register</a>
                <a href="/forgot-password">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-primary" onClick={(e) => {
                e.preventDefault()
            }}>Submit</button>
        </div>
    )
}
export default LoginScreen