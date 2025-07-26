import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import Alert from "../../components/Alert";
import ModalCustome from "../../components/modal/ModalCustom";
import CustomSelect from "../../components/select/CustomSelect";
import Spinner from "../../components/Spinner";
import { fetchListConversationAction } from "../../redux/actions/chatAction";
import { ConversationCreateReq } from "../../services/chat/conversationService";

import { components } from 'react-select'
import { ProfileSimpleResp } from "../../model/profileModel";

export default function CreateConversationForm() {
    const [openModal, setOpenModal] = useState(false)
    const [groupName, setGroupName] = useState("");
    const [avatar, setAvatar] = useState("");

   


    const { loading, hasError, message, success } = useSelector((state: any) => {
        return state.createConversation
    })

    const dispatch = useDispatch()



    const [showModal, setShowModal] = useState(false)

    const [keyword, setKeyword] = useState("")
    const [users, setUsers] = useState<ProfileSimpleResp[]>([])
    const [selectUsers, setSelectUsers]= useState<any>([])

    const handleSubmitInvitation = () => {
      
    }


    useEffect(() => {
        //get list users which related with current user(friends, common friends, suggestion)
    }, [])


    const onSave = () => {
        const conReq: ConversationCreateReq = {
            type: "PUBLIC",
            userIds: selectUsers,
            name: groupName,
            thumbnail: avatar
        }
        console.log(conReq)
       
    }

    if (success) {
        //@ts-ignore
        dispatch(fetchListConversationAction())
    }

    return (
        <>
            <button className="btn btn-primary" onClick={() => setOpenModal(true)}><i style={{ fontSize: "24px" }} className="bi bi-plus"></i></button>
            <ModalCustome
                onSave={onSave} onClose={() => setOpenModal(false)} title="Form create conversation"
                show={openModal}

            >
                {/* Tên nhóm */}
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                    />
                </div>

                {/* Chọn thành viên */}
                <div className="mb-3">
                    <label className="form-label">Select members</label>
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

                {/* Ảnh đại diện nhóm */}
                <div className="mb-3">
                    <label className="form-label">Thumnail</label>
                    <input
                        type="url"
                        className="form-control"
                        placeholder="https://example.com/image.jpg"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                    />
                </div>

                {/* Xem trước ảnh */}
                {avatar && (
                    <div className="mb-3 text-center">
                        <img src={avatar} alt="Group Avatar" className="img-thumbnail" style={{ maxWidth: "200px" }} />
                    </div>
                )}
                <Spinner loading={loading} />
                {hasError && <Alert message={message} type="danger"></Alert>}
            </ModalCustome>
        </>
    )
}