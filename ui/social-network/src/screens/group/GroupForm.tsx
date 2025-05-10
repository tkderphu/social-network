import ModalCustome from "../../components/modal/ModalCustom"

function GroupForm() {
    return (
        <>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1"
                    // name='email' onChange={(e: any) => setState(e, setAuthLoginReq)}
                    aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control"
                    // name='password' onChange={(e: any) => setState(e, setAuthLoginReq)}
                    id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="mb-2 d-flex justify-content-between">
                <a href="/register">Register</a>
                <a href="/forgot-password">Forgot password?</a>
            </div>
            {/* <Spinner loading={loading} /> */}
            <button className="btn btn-primary w-100" onClick={() => {
                // login()
            }}>Submit</button>
        </>
    )
}
export default GroupForm