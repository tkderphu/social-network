import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { TokenUtils } from "../../../common"
import { AppContext } from "../../../provider/AppProvider"
import profileService from "../../../services/profile/profileService"

export default function AddressInformationSection() {
    const [editPersonalInfor, setEditPersonalInfor] = useState(false)
    const [addresses, setAddresses] = useState<Record<string, string>>({
        "CURRENT_LIVING": "",
        "FROM": ""
    })
    const profile = useContext(AppContext)?.profile


    useEffect(() => {
        initialUserReqUpdate()
    }, [profile?.get])

    const initialUserReqUpdate = () => {
        if (profile?.get?.addresses) {
            setAddresses(profile.get.addresses)
        }
    }

    const onChange = (e: any) => {
        const {name, value} = e.target

        setAddresses((prev: any) => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmit = () => {
        profileService.updateAddresses(addresses, () => {
            profileService.getUserDetailByUserId(TokenUtils.authLogin.userId, profile?.set)
            setEditPersonalInfor(false)
            toast.success("Addresses updated successfully!")
        })
    }
    return (
        <>
            <div className="d-flex section-title justify-content-between align-items-center">
                <h5 >Address Information</h5>
                <div >
                    {!editPersonalInfor && (
                        <button className="btn btn-edit" id="editBtn"
                            onClick={() => setEditPersonalInfor(true)}
                        >
                            <i className="fas fa-edit me-2" />
                            Edit
                        </button>
                    )}
                    {editPersonalInfor && (
                        <div className="d-flex">
                            <button
                                className="btn btn-save me-2"
                                id="saveBtn"
                                onClick={onSubmit}
                            >
                                <i className="fas fa-save me-2" />
                                Save
                            </button>
                            <button
                                className="btn btn-secondary"
                                id="cancelBtn"
                                onClick={() => setEditPersonalInfor(false)}
                            >
                                <i className="fas fa-times me-2" />
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div id="addresses-section">
                <div className="row mb-3">
                    <div className="col-sm-4">
                        <span className="info-label">From</span>
                    </div>
                    <div className="col-sm-8">
                        <span className="info-value" id="home-address-view" style={{ display: `${!editPersonalInfor ? "block" : "none"}` }}>
                           {addresses['FROM'] || "null"}
                        </span>
                        <input
                            type="text"
                            onChange={onChange}
                            name='FROM'
                            className="form-control edit-mode"
                            id="home-address-edit"
                            value={addresses['FROM'] || ""}
                            style={{ display: `${editPersonalInfor ? "block" : "none"}` }}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-4">
                        <span className="info-label">Current living</span>
                    </div>
                    <div className="col-sm-8">
                        <span className="info-value" id="work-address-view" style={{ display: `${!editPersonalInfor ? "block" : "none"}` }}>
                            {addresses['CURRENT_LIVING'] || "null"}
                        </span>
                        <input
                            onChange={onChange}

                            type="text"
                            name='CURRENT_LIVING'
                            className="form-control edit-mode"
                            id="work-address-edit"
                            
                            value={addresses['CURRENT_LIVING'] || ""}
                            style={{ display: `${editPersonalInfor ? "block" : "none"}` }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}