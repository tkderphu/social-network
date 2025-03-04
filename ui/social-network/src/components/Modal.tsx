function Modal(props: { id: string }) {
    return (
        <div className={`modal fade ${props.id}`} tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <div className="card">
                                <div className="card-header">
                                    Personal Image
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
                        <div className="mb-3">
                            <div className="card">
                                <div className="card-header">
                                    Cover photos
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
                        <div className="mb-3">
                            <div className="card">
                                <div className="card-header">
                                    Info
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
                        <div className="mb-3">
                            <div className="card">
                                <div className="card-header">
                                    Education
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
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal