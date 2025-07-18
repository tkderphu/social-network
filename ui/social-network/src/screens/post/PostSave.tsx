import { useEffect, useState } from "react";
import seriesService from "../../services/post/seriesService";
import "./css/PostSave.css"
interface Series {
    id: any,
    name: any,
    thumbnail: any
}

export default function PostSave({closeModalWhenDone}: any) {
    const [series, setSeries] = useState<Series[]>([
        {
            id: 1,
            name: "quang phú",
            thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='1.5'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/%3E%3Cpolyline points='14,2 14,8 20,8'/%3E%3C/svg%3E"
        },
        {
            id: 2,
            name: "quang phú 2",
            thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='1.5'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/%3E%3Cpolyline points='14,2 14,8 20,8'/%3E%3C/svg%3E"
        }
    ])
    const [selectedSeries, setSelectedSeries] = useState<any>({})

    useEffect(() => {
        seriesService.getListSeries(setSeries)
    }, [])


    const selectCollection = (collectionId: any) => {
        // Uncheck all radio buttons
        document.querySelectorAll('input[name="collection"]').forEach(radio => {
            //@ts-ignore
            radio.checked = false;
        });

        // Check the selected collection
        //@ts-ignore
        document.getElementById('collection' + collectionId).checked = true;
    }

    function closeModal() {
        alert('Modal closed');
        // In a real application, this would close the modal
    }

    function saveToCollection() {
        const s = series.find((s) => selectedSeries[s.id])
        if(!s) {
            alert("Please choose series")
            return
        }


    }

    function createNewCollection() {
        const collectionName = prompt('Enter collection name:');
        if (collectionName && collectionName.trim()) {
            setSeries((prev) => [...prev, {
                id: 5,
                name: collectionName,
                thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='1.5'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/%3E%3Cpolyline points='14,2 14,8 20,8'/%3E%3C/svg%3E"
            }])
            setSelectedSeries(({
                5: true
            }))
        }
    }


    return (


        <div >
            {/* Collection Items */}
            {series?.map(s => {
                return (
                    <div className="collection-item" onClick={() => {
                        setSelectedSeries({
                            [s.id]: true
                        })
                    }}>
                        <div
                            className="collection-icon"
                            style={{ backgroundColor: "#f0f0f0" }}
                        >
                            <img
                                src={s.thumbnail}
                                alt="Document"
                            />
                        </div>
                        <div className="collection-info">
                            <div className="collection-name">{s.name}</div>
                            <div className="collection-privacy">
                                <i className="bi bi-lock-fill" />
                                Only me
                            </div>
                        </div>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="collection"
                            id="collection1"
                            checked={selectedSeries[s.id]}
                        />
                    </div>
                )
            })}

            {/* New Collection */}
            <a
                href="#"
                className="new-collection text-decoration-none"
                onClick={() => createNewCollection()}
            >
                <i className="bi bi-plus" style={{ color: "black" }} />
                <span>New Collection</span>
            </a>
           <div className="d-flex justify-content-center">
           <button type="button" className="btn btn-primary w-100 mt-3" onClick={() => saveToCollection()}>Done</button>
           </div>
        </div>



    )
}