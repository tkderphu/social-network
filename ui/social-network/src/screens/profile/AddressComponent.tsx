function AddressComponent() {
    return (
        <div className="mb-3">
            <div className="card">
                <div className="card-header">
                    Address
                </div>
                <div className="card-body">
                    <div className="form-floating mb-3 w-100">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    </div>
                    <div className="form-floating mb-3 w-100">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    </div>
                    <div className="form-floating mb-3 w-100">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    </div>
                    <div className="form-floating mb-3 w-100">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    </div>
                </div>
            </div>
            <div className="card-footer"><button className="btn btn-primary w-50">Edit</button></div>
        </div>
    )
}
export default AddressComponent