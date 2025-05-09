import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TokenUtils } from "../../common"
import Alert from "../../components/Alert"
import Spinner from "../../components/Spinner"
import { ProfileUpdateInfoReqVO } from "../../model/profileModel"
import { updateInfoProfile } from "../../redux/actions/profileAction"
import profileService from "../../services/profile/profileService"

function ProfileAbouComponent() {

    const [updateInfoReq, setUpdateInfoReq] = useState<ProfileUpdateInfoReqVO>()
    const {loading, hasError, message} = useSelector((state: any) => {
        return state.updateInfo
    })
    const dispatch = useDispatch()
    const onChange = (e: any) => {
        const {name, value } = e.target
        setUpdateInfoReq((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmit = () => {
        console.log("info: ", updateInfoReq)
        //@ts-ignore
        dispatch(updateInfoProfile(TokenUtils.authLogin.userId, updateInfoReq))
    }

    return (
        <div className="mb-3">
            <div className="card">
                <div className="card-header">
                    Info
                </div>
                <div className="card-body">
                    <div className="form-floating mb-3 w-100">
                        <input type="text" className="form-control" onChange={onChange} name='firstName' id="floatingInput" placeholder="First Name" />
                    </div>
                    <div className="form-floating mb-3 w-100">
                        <input type="text" className="form-control"  onChange={onChange}name='lastName' id="floatingInput" placeholder="Last Name" />
                    </div>
                    <div className="form-floating mb-3 w-100">
                        <input type="tel" className="form-control" onChange={onChange} name='phoneNumber' id="floatingInput" placeholder="Phone Number" />
                    </div>
                    <div className="form-floating mb-3 w-100">
                        <input type="text" className="form-control"  onChange={onChange} name='sex' id="floatingInput" placeholder="Sex = MALE | FEMALE" />
                    </div>
                    <div className="form-floating mb-3 w-100">
                        <input type="date" className="form-control"  onChange={onChange}name='dataOfBirth' id="floatingInput" placeholder="name@example.com" />
                    </div>
                </div>
            </div>
            <div className="card-footer"><button className="btn btn-primary w-100" onClick={onSubmit}>Edit</button></div>
        </div>
    )
}
export default ProfileAbouComponent