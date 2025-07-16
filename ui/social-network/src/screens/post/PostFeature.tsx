import { ConfirmDialog } from "primereact/confirmdialog"
import { useContext, useState } from "react"
import { TokenUtils } from "../../common"
import ModalCustome from "../../components/modal/ModalCustom"
import { PostContext } from "./PostCard"
import PostReport from "./PostReport"
import PostSave from "./PostSave"

export default function PostFeature() {
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [openModalSave, setOpenModalSave] = useState(false)
    const [openModalReport, setOpenModalReport] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const post = useContext(PostContext)?.post
    return (
        <>
            <div className="dropdown">
                <button className="btn" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-three-dots"></i>
                </button>
                <ul className="dropdown-menu">
                    {post?.user.id === TokenUtils.authLogin.userId && (<li onClick={() => setOpenModalUpdate(true)}><a className="dropdown-item" href="#">Update</a></li>)}
                    <li onClick={() => setOpenModalSave(true)}><a className="dropdown-item" href="#">Save</a></li>
                    <li onClick={() => setOpenModalReport(true)}><a className="dropdown-item" href="#">Report</a></li>
                    {post?.user.id === TokenUtils.authLogin.userId && (<li onClick={() => setOpenModalDelete(true)}><a className="dropdown-item" href="#">Delete</a></li>)}
                </ul>
            </div>
            <ModalCustome title='Update post' show={openModalUpdate}
                onClose={() => {
                    setOpenModalUpdate(false)
                }}
                children={<></>}
            />
            <ModalCustome title='Save post' show={openModalSave}
                closable={false}
                onClose={() => {
                    setOpenModalSave(false)
                }}
                weight={"500px"}
                children={<PostSave />}
            />
            <ModalCustome title='Report post' show={openModalReport}
                onClose={() => {
                    setOpenModalReport(false)
                }}
                weight={"600px"}
                children={<PostReport/>}
                closable={false}
            />


            <ConfirmDialog
                group="declarative"
                visible={openModalDelete}
                onHide={() => setOpenModalDelete(false)}
                message={"Do you want to delete this post"}
                header={"Delete"}
                accept={() => {
                    alert("ok")
                }}
                style={{ width: '50vw' }}
                breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
            />
        </>
    )
}