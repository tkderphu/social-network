import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { TokenUtils } from "../../../common"
import { AppContext } from "../../../provider/AppProvider"
import notificationSettingService from "../../../services/notification/notificationSettingService"

const notifyConstants = [
    {
        key: "enablePushNotification",
        icon: <i className="fas fa-bell text-danger me-2" />,
        ex: "Push Notifications"
    },
    {
        key: "enableFriendsRequestNotification",
        icon: <i className="fas fa-user-plus text-primary me-2" />,
        ex: "Friend Request Notifications"
    },
    {
        key: "enableAcceptRequestNotification",
        icon: <i className="fas fa-user-check text-success me-2" />,
        ex: "Accept Request Notifications"
    },
    {
        key: "enablePostFriendsNotification",
        icon: <i className="fas fa-user-friends text-success me-2" />,
        ex: "Friends' Post Notifications"
    },
    {
        key: "enablePostGroupsNotification",
        icon: <i className="fas fa-users text-info me-2" />,
        ex: "Group Post Notifications"
    },
    {
        key: "enableSoundNotification",
        icon: <i className="fas fa-volume-up text-secondary me-2" />,
        ex: "Sound Notifications"
    }
]

export default function NotificationSection() {
    const [editPersonalInfor, setEditPersonalInfor] = useState(false)
    const [req, setReq] = useState<any>({
        enablePushNotification: false,
        enableFriendsRequestNotification: false,
        enableAcceptRequestNotification: false,
        enablePostFriendsNotification: false,
        enablePostGroupsNotification: false,
        enableSoundNotification: false,
    })
    const notificationSetting = useContext(AppContext)?.notificationSetting


    useEffect(() => {
        initialNotificationSettingUpdate()
    }, [notificationSetting?.get])

    const initialNotificationSettingUpdate = () => {
        if (notificationSetting?.get) {
            setReq(notificationSetting.get)
        }
    }


    const onChange = (e: any) => {
        const { name, checked } = e.target
        setReq((prev: any) => ({
            ...prev,
            [name]: checked
        }))
    }


    const onSubmit = () => {
       notificationSettingService.updatePush(req, () => {
        notificationSettingService.getNotificationSetting(notificationSetting?.set);
        setEditPersonalInfor(false)
        toast.success("Notification updated successfully!")
       })
    }
    return (
        <div className="card profile-info-card">

            <div className="card-body">
                <>
                    <div className="d-flex section-title justify-content-between">
                        <h5 className="">Notification Settings</h5>
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
                                        onChange={onChange}
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

                            {notifyConstants.map((notify, i) => {
                                if (i >= 3) return null
                                return (
                                    <div className="form-check mb-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name={notify.key}
                                            onChange={onChange}
                                            checked={req[notify.key]}
                                            id={notify.key}
                                            disabled={!editPersonalInfor}
                                        />
                                        <label className="form-check-label" htmlFor={notify.key}>
                                            {notify.icon}
                                            {notify.ex}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="col-md-6">

                            {notifyConstants.map((notify, i) => {
                                if (i < 3) return null
                                return (
                                    <div className="form-check mb-3">
                                        <input
                                            name={notify.key}
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={req[notify.key]}
                                            id={notify.key}
                                            onChange={onChange}
                                            disabled={!editPersonalInfor}
                                        />
                                        <label className="form-check-label" htmlFor={notify.key}>
                                            {notify.icon}
                                            {notify.ex}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </>

            </div>

        </div>
    )
}