
function ProfilePhotosComponent() {
    return (
        <div className="mb-3">
            <div className="card">
                <div className="card-header">
                    Your image
                </div>
                <div className="card-body">
                    <div className="d-flex flex-wrap">
                        <img src="https://bizweb.dktcdn.net/100/503/392/products/1-ceb6ac06-ea04-4b07-a0ce-57c30a2866fa.jpg?v=1738814481290"
                            alt="vcl" height={"100px"} width={"100px"} className="img-fluid img-thumbnail mx-3" />
                        <img src="https://bizweb.dktcdn.net/100/503/392/products/1-ceb6ac06-ea04-4b07-a0ce-57c30a2866fa.jpg?v=1738814481290"
                            alt="vcl" height={"100px"} width={"100px"} className="img-fluid img-thumbnail mx-3" />

                        <img src="https://bizweb.dktcdn.net/100/503/392/products/1-ceb6ac06-ea04-4b07-a0ce-57c30a2866fa.jpg?v=1738814481290"
                            alt="vcl" height={"100px"} width={"100px"} className="img-fluid img-thumbnail mx-3" />

                        <img src="https://bizweb.dktcdn.net/100/503/392/products/1-ceb6ac06-ea04-4b07-a0ce-57c30a2866fa.jpg?v=1738814481290"
                            alt="vcl" height={"100px"} width={"100px"} className="img-fluid img-thumbnail mx-3" />

                        <img src="https://bizweb.dktcdn.net/100/503/392/products/1-ceb6ac06-ea04-4b07-a0ce-57c30a2866fa.jpg?v=1738814481290"
                            alt="vcl" height={"100px"} width={"100px"} className="img-fluid img-thumbnail mx-3" />

                        <img src="https://bizweb.dktcdn.net/100/503/392/products/1-ceb6ac06-ea04-4b07-a0ce-57c30a2866fa.jpg?v=1738814481290"
                            alt="vcl" height={"100px"} width={"100px"} className="img-fluid img-thumbnail mx-3" />
                    </div>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="formFileMultiple" className="form-label">Choose images</label>
                            <input className="form-control" type="file" id="formFileMultiple" multiple />
                        </div>
                        <button className="btn btn-primary w-100">Upload</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfilePhotosComponent