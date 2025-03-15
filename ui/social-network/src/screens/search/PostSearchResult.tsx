import UserSearchResult from "./UserSearchResult"

function PostSearchResult() {
    return (
        <div className="row">
            <div className="col-3 sticky-sidebar">
                <h4 className="mx-3">Search Results</h4>
                <button className="w-100 text-left p-3 search-active" style={{ border: "none" }}>Posts</button>
                <button className="w-100 text-left p-3" style={{ border: "none" }}>People</button>
                <button className="w-100 text-left p-3" style={{ border: "none" }}>Pages</button>
                <button className="w-100 text-left p-3" style={{ border: "none" }}>Groups</button>
            </div>
            <div className="col-9">
                <div className="card mt-4">
                    <div className="card-body">
                        <h5 className="card-title">Phu Nguyen</h5>
                        <p className="card-text">March 1 at 7:32 PM</p>
                        <p className="card-text">This is a sample post.</p>
                    </div>
                </div>
                <div className="card mt-4">
                    <div className="card-body">
                        <h5 className="card-title">Phu Nguyen</h5>
                        <p className="card-text">March 1 at 7:32 PM</p>
                        <p className="card-text">This is a sample post.</p>
                    </div>
                </div>
                <div className="card mt-4">
                    <div className="card-body">
                        <h5 className="card-title">Phu Nguyen</h5>
                        <p className="card-text">March 1 at 7:32 PM</p>
                        <p className="card-text">This is a sample post.</p>
                    </div>
                </div>

                <div className="card mt-4">
                    <div className="card-body">
                        <h5 className="card-title">Phu Nguyen</h5>
                        <p className="card-text">March 1 at 7:32 PM</p>
                        <p className="card-text">This is a sample post.</p>
                    </div>
                </div>
                <div className="card mt-4">
                    <div className="card-body">
                        <h5 className="card-title">Phu Nguyen</h5>
                        <p className="card-text">March 1 at 7:32 PM</p>
                        <p className="card-text">This is a sample post.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostSearchResult