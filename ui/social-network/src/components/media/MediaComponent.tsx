import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UploadedRespVO } from "../../model/mediaModel";
import { AppContext } from "../../provider/AppProvider";
import MediaService from "../../services/media/mediaService";
import FullScreenLoader from "../fullSpinner/FullScreenLoader";
import ModalCustome from "../modal/ModalCustom";
import "./MediaComponent.css"
// const sampleImages = [
//     'https://picsum.photos/300/200?random=1',
//     'https://picsum.photos/300/200?random=2',
//     'https://picsum.photos/300/200?random=3',
//     'https://picsum.photos/300/200?random=4',
//     'https://picsum.photos/300/200?random=5',
//     'https://picsum.photos/300/200?random=6',
//     'https://picsum.photos/300/200?random=7',
//     'https://picsum.photos/300/200?random=8',
//     'https://picsum.photos/300/200?random=9',
//     'https://picsum.photos/300/200?random=10',
//     'https://picsum.photos/300/200?random=11',
//     'https://picsum.photos/300/200?random=12'
// ];
interface MediaProps {
    images?: any,
    onChange: any
}
export default function MediaComponent(props: MediaProps) {

    const [blobImageUrl, setBlobImageUrl] = useState<string |null>(null)
    const [formData, setFormData] = useState<FormData |undefined>()
    const uploadStateLoading = useContext(AppContext)?.uploadState.loading
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];  // Get the first file (for single file uploads)
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            setFormData(formData)
            // Create a Blob URL to preview the image
            const url = URL.createObjectURL(file);
            setBlobImageUrl(url);  // Set the image URL to display
        }
    };

    const uploadImages = () => {
        uploadStateLoading?.set(true)
        MediaService.upload(formData).then(resp => {
            MediaService.getListUploaded(setUploadeds);
            setBlobImageUrl(null)
            setFormData(undefined)
            toast.success("Uploaded successfully")
        }).catch(err => {
            const msg = err?.response?.data?.message || err?.message

            toast.error(`File uploaded fail: ${msg}`)
            console.error("err uploaded: ", err)
        }).finally(() => {
            uploadStateLoading?.set(false)
        })
    }
    const [openModal, setOpenModal] = useState(false)


    const [uploadeds, setUploadeds] = useState<UploadedRespVO[]>([])

    useEffect(() => {
        MediaService.getListUploaded(setUploadeds);
    }, [])


    if(uploadStateLoading?.get) {
        return <FullScreenLoader/>
    }

    return (
        <>
            <button className="btn btn-outline-primary" onClick={() => setOpenModal(true)}>Choose images</button>
            <ModalCustome
                show={openModal}
                onClose={() => setOpenModal(false)}
                title={"My images"}
                children={
                    <div className="">

                        <div className="gallery-container">
                            <div className="gallery-header">
                                <h5>Number images are selected: {props.images?.length}</h5>
                                <p className="gallery-subtitle">
                                    Select an image from your collection or upload a new one
                                </p>
                            </div>
                            <div className="selected-info" id="selectedInfo">
                                <i className="fas fa-check-circle me-2" />
                                <span id="selectedText">Image selected successfully!</span>
                            </div>
                            <div className="image-grid" id="imageGrid">
                                {uploadeds.map((image) => {
                                    return (
                                        <div onClick={() => {
                                            //@ts-ignore
                                            let c = [...props.images]
                                            if (c.includes(image)) {
                                                c = c.filter(img => {
                                                    return image.publicId != img.publicId
                                                })
                                            } else {
                                                c.push(image)
                                            }
                                            props.onChange(c)
                                        }} className={"image-card " + (props.images.includes(image) ? "selected" : "")}>
                                            <img src={image.url} alt="Gallery Image ${index + 1}" loading="lazy" />
                                            <div className="image-overlay">
                                                <i className="fas fa-check check-icon"></i>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="upload-section ">
                                <div className="upload-icon">
                                    <i className="fas fa-cloud-upload-alt" />
                                </div>
                                <h4 className="mb-3">Upload New Image</h4>
                                {blobImageUrl ? (<div className="d-flex justify-content-center mb-3">
                                    <img src={blobImageUrl} className={"rounded text-center"} style={{display: "block"}}  height={300}/>
                                    </div>) : (
                                    <p className="text-muted mb-4">
                                    Choose an image file to add to your gallery 
                                </p>
                                )}
                                <div className="file-input-wrapper">
                                    <input
                                        type="file"
                                        className="file-input"
                                        id="fileInput"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="fileInput" className="file-input-label">
                                        <i className="fas fa-folder-open" />
                                        Choose File
                                    </label>
                                </div>
                                {/* <div
                                    className="filename-display"
                                    id="filenameDisplay"
                                    style={{ display: "none" }}
                                >
                                    No file selected
                                </div> */}
                                <div className="mt-3">
                                    <button className="btn btn-primary upload-btn" onClick={uploadImages}>
                                        <i className="fas fa-upload me-2" />
                                        Upload Image
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </>
    )
}