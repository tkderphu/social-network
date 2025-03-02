
import "./Authen.css"
function ForgotPassworScreen() {
    return (
        <div  style={{minWidth: "350px"}}>
            <h3>Forgot Password</h3>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="mb-2 d-flex justify-content-between">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>
            <button type="submit" className="btn btn-primary" onClick={(e) => {
                e.preventDefault()
            }}>Submit</button>
        </div>
    )
}
export default ForgotPassworScreen