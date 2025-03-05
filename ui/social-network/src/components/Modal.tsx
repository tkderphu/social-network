function Modal(props: { id: string, title: string, html: any }) {
    return (
        <div className={`modal fade ${props.id}`} tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" style={{maxWidth: "100%", margin: "5px"}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {props.html}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal