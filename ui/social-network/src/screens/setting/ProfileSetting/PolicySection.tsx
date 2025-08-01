import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { TokenUtils } from "../../../common"
import { AppContext } from "../../../provider/AppProvider"
import profileService from "../../../services/profile/profileService"
import { convertToHeader } from "../../../utils/utils"

const policy = {
    "CHAT": [
        {
            key: "ANYONE",
            ex: "Anyone can chat with you"
        },
        {
            key: "ONY_FRIENDS",
            ex: "Only your friends can chat with you"
        }
    ],
    "NOTIFICATION": [
        {
            key: "ANYONE",
            ex: "You will receive notification from users that interacted with you"
        },
        {
            key: "FRIENDS_NOTIFY",
            ex: "You only receive notification from your friends"
        },

    ],
    "POST": [
        {
            key: "ANYONE",
            ex: "Anyone can see your posts"
        },
        {
            key: "ONLY_ME",
            ex: "Only you can see your posts"
        },
        {
            key: "ONLY_FRIENDS",
            ex: "Only your friends can see your posts"
        }
    ]

}
const template = (key: string, ex: { key: string, ex: string }[], onchange: any, disable: boolean, req: any) => {
    
    return (
        <>
            <h5 className="section-title">{convertToHeader(key)}</h5>
            <div className="form-check mb-3" >
                {ex.map((d, i) => {
                    return (
                        <div className="mb-3">
                            <input
                                disabled={!disable}
                                className="form-check-input"
                                type="radio"
                                checked={req[key] == d.key}
                                name={key}
                                onChange={onchange}
                                value={d.key}
                                id={key + i}
                            />
                            <label className="form-check-label" htmlFor={key + i}>
                                {d.ex}
                            </label>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default function PolicySection() {
    const [editPersonalInfor, setEditPersonalInfor] = useState(false)
    const [policyReq, setPolicyReq] = useState<Record<string, string>>({
        "CHAT": "",
        "NOTIFICATION": "",
        "POST" : ""
    })
    const profile = useContext(AppContext)?.profile


    useEffect(() => {
        initialUserReqUpdate()
    }, [profile?.get])

    const initialUserReqUpdate = () => {
        if (profile?.get?.policies) {
            setPolicyReq(profile.get.policies)
        }
    }

    const onChange = (e: any) => {
        const {name, value} = e.target
        setPolicyReq((prev: any) => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmit = () => {
        profileService.updatePolicy(policyReq, () => {
            profileService.getUserDetailByUserId(TokenUtils.authLogin.userId, profile?.set)
            setEditPersonalInfor(false)
            toast.success("Policy updated successfully!")
        })
    }

    return (
        <div className="card profile-info-card">
            <div className="card-body">
                <div className=" section-title d-flex justify-content-between align-items-center">
                    <h5 >Privacy &amp; Policies</h5>
                    <div>
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
                <div className="row">
                    <div className="col-md-6">
                        {template('CHAT', policy['CHAT'], onChange, editPersonalInfor, policyReq)}
                        {/* {template('NOTIFICATION', policy['NOTIFICATION'], onChange, editPersonalInfor, policyReq)} */}
                    </div>
                    <div className="col-md-6">
                    {template('POST', policy['POST'], onChange, editPersonalInfor, policyReq)}
                    </div>
                </div>
            </div>
        </div>
    )
}