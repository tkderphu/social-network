import { useContext, useState } from "react"
import ModalCustome from "../../components/modal/ModalCustom"
import { PostContext } from "./PostCard"

export default function PostShare() {
    const [showDialog, setShowDialog] = useState(false)
    const post = useContext(PostContext)?.post
    return (
        <>
            <button className="btn btn-sm btn-outline-info">Share: {post?.postStats?.numberShare || 0}</button>
            <ModalCustome
                title='Post form'
                show={showDialog}
                onSave={() => {}}
                onClose={() => setShowDialog(false)}
                children={<></>}
            />
        </>
    )
}