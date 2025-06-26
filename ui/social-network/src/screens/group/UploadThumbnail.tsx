
import { useContext, useEffect, useState } from "react"
import ModalCustome from "../../components/modal/ModalCustom"

import MediaComponent from "../../components/media/MediaComponent"
import { GroupResp } from "../../model/groupModel"
import { GroupContext } from "./GroupDetails"
import postService, { PostCreateReq } from "../../services/post/postService"
import { toast } from "react-toastify"
export default function UploadThumbnail() {
    const [thumbnail, setThumbnail] = useState('')
    const [description, setDescription] = useState('')
    const group: GroupResp = useContext(GroupContext)



    const [showModal, setShowModal] = useState(false)

    const handleSubmitUpload = () => {
        if(!thumbnail) {
            alert('Please choose an image')
            return
        }
        const postReq: PostCreateReq = {
            content: description,
            postPrivacy: "PUBLIC",
            groupId: group.id,
            mediaUrls: [thumbnail],
            postType: "COVER_PHOTO_UPDATE",
        }
        postService.createPost(postReq).then(resp => {
            toast("Update post cover photo successfully")
        }).catch(err => {
            alert("err when create post")
            console.log("err: ", err)
        })
    }

    return (
        <>
            <button className="btn btn-secondary me-2" onClick={() => setShowModal(true)}>Upload thumbnail</button>
            <ModalCustome title="Upload thumbnail" closable={false} show={showModal} onClose={() => setShowModal(false)}>

                <div style={{ minHeight: 300 }}>

                    <div className="form-group mb-3" >
                        <label htmlFor="exampleInputPassword1" className="mb-2">Description</label>
                        <input type={"text"} onChange={(e) => setDescription(e.target.value)} id="exampleInputPassword1" className="form-control" placeholder="Enter your description about picture" />
                    </div>
                    <div className="mb-3">
                        <div>
                            <MediaComponent
                                multipleImage={false}
                                images={thumbnail}
                                onChange={(image: string) => setThumbnail(image)} />

                        </div>
                    </div>
                    {thumbnail && (
                        <div className="d-flex mb-3">
                        <img className="rounded" src={thumbnail} />
                    </div>
                    )}

                    <div>
                        <button className="btn btn-primary w-100" onClick={handleSubmitUpload}>Save</button>
                    </div>
                </div>

                {/* <Spinner loading={loading} /> */}
            </ModalCustome>
        </>
    )
}