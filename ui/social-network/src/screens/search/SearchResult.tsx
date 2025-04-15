import { Link, Outlet } from "react-router"
import './Search.css'
function SearchResult() {
    return (
        <div className="row">
            <div className="col-4 sticky-sidebar">
                <h4 className="mx-3">Search Results</h4>
                <Link to={'/posts'} className="w-100 text-left p-3" style={{ border: "none" }}>Posts</Link>
                <button className="w-100 text-left p-3 search-active" style={{ border: "none" }}>People</button>
                <button className="w-100 text-left p-3" style={{ border: "none" }}>Pages</button>
                <button className="w-100 text-left p-3" style={{ border: "none" }}>Groups</button>
            </div>
            <div className="col-8">
                <Outlet/>
            </div>
        </div>
    )
}
export default SearchResult