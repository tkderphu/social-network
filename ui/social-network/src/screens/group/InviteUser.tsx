import { useContext, useEffect, useState } from "react"
import ModalCustome from "../../components/modal/ModalCustom"
import CustomSelect from "../../components/select/CustomSelect"
import { ProfileSimpleResp } from "../../model/profileModel"
import profileService from "../../services/profile/profileService"
import { components } from 'react-select'
import groupMemberService from "../../services/group/userMemberGroupService"
import userMemberGroupService from "../../services/group/userMemberGroupService"
import { GroupContext } from "./GroupDetails"
import { GroupResp } from "../../model/groupModel"
export default function InviteUser() {
    const [keyword, setKeyword] = useState("")
    const [users, setUsers] = useState<ProfileSimpleResp[]>([])
    const group: GroupResp = useContext(GroupContext)    

    useEffect(() => {
        profileService.search(keyword).then(resp => {
            setUsers(resp.data.data)
        }).catch(err => {
            alert("err")
            console.log("err: ", err)
        });
    }, [keyword])

    const [showModal, setShowModal] = useState(false)

    const [selectUsers, setSelectUsers]= useState<any>([])

    const handleSubmitInvitation = () => {
        userMemberGroupService.inviteUsers(group.id, selectUsers).then(resp => {
            alert("invite user success fully")
        }).catch(err => {
            alert("error when invited users")
        })
    }

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
                                    select={{
                                        set: setSelectUsers
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
                                <button onClick={handleSubmitInvitation} style={{padding: 0, margin: 0}} className="btn btn-primary w-100 h-100">Submit</button>
                            </div>
                        </div>


                    </div>
                </div>

                {/* <Spinner loading={loading} /> */}
            </ModalCustome>
        </>
    )
}