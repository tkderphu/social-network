import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router"
import { MediaRespVO, UploadedRespVO } from "../../model/mediaModel"
import mediaService from "../../services/media/mediaService"


function ProfilePhotosComponent() {
    const [medias, setMedias] = useState<MediaRespVO[]>([])
    const [uploadedMedias, setUploadedMedias] = useState<UploadedRespVO[]>([])
    const location = useLocation()
    const { userId } = useParams()
    useEffect(() => {
        mediaService.getListMedia("user", userId + "", setMedias)
        mediaService.getListUploaded(setUploadedMedias)
    }, [location.pathname])

    return (
        <div className="mb-3">
            <div className="card mb-4">
                <div className="card-header">
                    Post images
                </div>
                <div className="card-body">
                    <div className="d-flex flex-wrap">
                        {medias.map(media => {
                            return (
                                <img src={media.url}
                                    alt="vcl" height={"200px"} width={"200px"} className="img-fluid img-thumbnail mx-3" />
                            )
                        })}

                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    Uploaded images
                </div>
                <div className="card-body">
                    <div className="d-flex flex-wrap">
                        {uploadedMedias.map(upload => {
                            return (
                                <img src={upload.url}
                                    alt="vcl" height={"100px"} width={"100px"} className="img-fluid img-thumbnail mx-3" />
                            )
                        })}


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