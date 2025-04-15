import { Link, Outlet } from "react-router"

function Friend() {
    return (
        <div className="row">
            <div className="col-4 d-flex flex-column align-items-center">
                <Link to={''}  className='p-3' style={{ border: "none" }}>Your friends</Link>
                <Link to={'requests'}  className='p-3'  style={{ border: "none" }}>Friend Requests</Link>
                <Link to={'accepts'}  className='p-3'  style={{ border: "none" }}>Friend Accepts</Link>
                <Link to={"suggestions"} className='p-3' >Suggestions</Link>
            </div>
            <div className="col-8">
                <Outlet/>
            </div>
        </div>
    )
}
export default Friend