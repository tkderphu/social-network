import { useEffect, useState } from "react"
import ModalCustome from "../../components/modal/ModalCustom"
import CustomSelect from "../../components/select/CustomSelect"
import { ProfileSimpleResp } from "../../model/profileModel"
import profileService from "../../services/profile/profileService"
import { components } from 'react-select'
export default function InviteUser() {
    const [keyword, setKeyword] = useState("")
    const [users, setUsers] = useState<ProfileSimpleResp[]>([])


    useEffect(() => {
        profileService.search(keyword).then(resp => {
            setUsers(resp.data.data)
        }).catch(err => {
            alert("err")
            console.log("err: ", err)
        });
    }, [keyword])

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className="btn btn-primary me-2" onClick={() => setShowModal(true)}>Invite</button>
            <ModalCustome title="Search user" closable={false} show={showModal} onClose={() => setShowModal(false)}>

                <div style={{ minHeight: 300 }}>
                    <label htmlFor="exampleInputPassword1" className="mb-2">Enter keyword</label>

                    <div className="form-group mb-3" >
                        <div className="row">
                            <div className="col-11" style={{paddingRight: 0}}>
                                <CustomSelect
                                    customOption={(props: any) => {
                                        console.log("props custom: ",)
                                        return (
                                            <components.Option {...props}>
                                                <div className="d-flex">
                                                    <img height={50} src={props.data.avatar} />
                                                    <div>
                                                        <div style={{ fontWeight: 'bold' }}>{props.data.label}</div>
                                                        <div>534 friends</div>
                                                    </div>
                                                </div>
                                            </components.Option>
                                        )
                                    }}
                                    data={users.map(user => {
                                        return {
                                            label: user.firstName + " " + user.lastName,
                                            value: user.id,
                                            avatar: user.imageUrl || user.avatar,
                                            online: user.isOnline
                                        }
                                    })}
                                    input={{
                                        setValue: setKeyword,
                                        value: keyword
                                    }}
                                />

                            </div>
                            <div className="col-1" style={{padding: 0}}>
                                <button style={{padding: 0, margin: 0}} className="btn btn-primary w-100 h-100">Submit</button>
                            </div>
                        </div>


                    </div>
                </div>

                {/* <Spinner loading={loading} /> */}
            </ModalCustome>
        </>
    )
}