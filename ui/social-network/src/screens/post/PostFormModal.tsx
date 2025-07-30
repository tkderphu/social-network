import { useContext, useState } from "react"
import ModalCustome from "../../components/modal/ModalCustom"
import { AppContext } from "../../provider/AppProvider"
interface Props {
    form: any,
    onSubmit: any,
    disableShowInfo?: boolean,
    title?: string
}
export default function PostFormModal(props: Props) {
    const userProfile = useContext(AppContext)?.profile
    const [showDialog, setShowDialog] = useState(false)
    return (
        <>
            {!props.disableShowInfo ? (
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="d-flex align-items-center text-center">
                            <img
                                src={userProfile?.get?.avatar}
                                alt="User avatar"
                                className="rounded-circle me-2 border"
                                style={{ width: '40px', height: '40px' }}
                            />
                            <input
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setShowDialog(true)
                                }}
                                className="form-control"
                                placeholder="What's on your mind?"
                            ></input>
                        </div>
                    </div>
                </div>
            ) : (<button className="add-cover-btn" onClick={() => {
                setShowDialog(true)
            }}>
                <i className="fas fa-camera" />
                Add cover photo
            </button>)}
            <ModalCustome
                title={props.title || 'Post form'}
                show={showDialog}
                onSave={props.onSubmit}
                onClose={() => setShowDialog(false)}
                children={props.form}
            />
        </>
    )
}