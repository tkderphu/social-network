import { useState } from "react"
import ModalCustome from "../../components/modal/ModalCustom"
import PostForm from "./PostForm"

export default function PostFormModal(props: { form?: any }) {

    const [showDialog, setShowDialog] = useState(false)
    return (
        <>
            <div className="card mb-3">
                <div className="card-body">
                    <div className="d-flex align-items-center text-center mb-3">
                        {/* <img
              src="https://via.placeholder.com/40"
              alt="User avatar"
              className="rounded-circle me-2"
              style={{ width: '40px', height: '40px' }}
            /> */}
                        <input
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                console.log("vcl")
                                setShowDialog(true)
                            }}
                            className="form-control"
                            placeholder="What's on your mind?"
                        // disabled
                        ></input>
                    </div>
                </div>
            </div>
            <ModalCustome
                title='Post form'
                show={showDialog}
                onSave={props.form?.onSubmit}
                onClose={() => setShowDialog(false)}
                children={<PostForm form={props.form} />}
                
            />
        </>
    )
}