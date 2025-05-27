import { useState } from "react";
import ModalCustome from "../modal/ModalCustom";
import "./MediaComponent.css"
const sampleImages = [
    'https://picsum.photos/300/200?random=1',
    'https://picsum.photos/300/200?random=2',
    'https://picsum.photos/300/200?random=3',
    'https://picsum.photos/300/200?random=4',
    'https://picsum.photos/300/200?random=5',
    'https://picsum.photos/300/200?random=6',
    'https://picsum.photos/300/200?random=7',
    'https://picsum.photos/300/200?random=8',
    'https://picsum.photos/300/200?random=9',
    'https://picsum.photos/300/200?random=10',
    'https://picsum.photos/300/200?random=11',
    'https://picsum.photos/300/200?random=12'
];
interface MediaProps {
    images?: string[],
    onChange: any
}
export default function MediaComponent(props: MediaProps) {
    const uploadImages = () => {

    }
    const [openModal, setOpenModal] = useState(false)
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
                                {sampleImages.map((image, index) => {
                                    return (
                                        <div onClick={() => {
                                            //@ts-ignore
                                            let c = [...props.images]
                                            if(c.includes(image)) {
                                                c = c.filter(img => {
                                                    return image != img
                                                })
                                            } else {
                                                c.push(image)
                                            }
                                            props.onChange(c)
                                        }} className={"image-card " + (props.images?.includes(image) ? "selected" : "")}>
                                            <img src={image} alt="Gallery Image ${index + 1}" loading="lazy" />
                                            <div className="image-overlay">
                                                <i className="fas fa-check check-icon"></i>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="upload-section">
                                <div className="upload-icon">
                                    <i className="fas fa-cloud-upload-alt" />
                                </div>
                                <h4 className="mb-3">Upload New Image</h4>
                                <p className="text-muted mb-4">
                                    Choose an image file to add to your gallery
                                </p>
                                <div className="file-input-wrapper">
                                    <input
                                        type="file"
                                        className="file-input"
                                        id="fileInput"
                                        accept="image/*"
                                    />
                                    <label htmlFor="fileInput" className="file-input-label">
                                        <i className="fas fa-folder-open" />
                                        Choose File
                                    </label>
                                </div>
                                <div
                                    className="filename-display"
                                    id="filenameDisplay"
                                    style={{ display: "none" }}
                                >
                                    No file selected
                                </div>
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