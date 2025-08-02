import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import Alert from "../../components/Alert";
import ModalCustome from "../../components/modal/ModalCustom";
import CustomSelect from "../../components/select/CustomSelect";
import Spinner from "../../components/Spinner";
import { fetchListConversationAction } from "../../redux/actions/chatAction";
import conversationService, { ConversationCreateReq } from "../../services/chat/conversationService";

import { components } from 'react-select'
import { ProfileSimpleResp } from "../../model/profileModel";
import SearchInput from "./search-user/SearchInput";
import { UserResp } from "../../services/friendship/friendshipService";
import { useNavigate } from "react-router";
import { MessengerContext } from "./Messenger";

export default function CreateConversationForm() {
    const [openModal, setOpenModal] = useState(false)
    const [groupName, setGroupName] = useState("");
    const [avatar, setAvatar] = useState("");
    const setConversations = useContext(MessengerContext)?.conversations?.set

    const [selectUsers, setSelectUsers]= useState<UserResp[]>([])
    const navigate = useNavigate()
  

    useEffect(() => {
        //get list users which related with current user(friends, common friends, suggestion)
    }, [])


    const onSave = () => {
        const conReq: ConversationCreateReq = {
            type: "PUBLIC",
            userIds: selectUsers.map(r => r.id),
            nickname: groupName,
            thumbnail: avatar
        }
        console.log(conReq)
       conversationService.createConversation(conReq, (conversationId: string) => {
            conversationService.getListConversation(true, setConversations)
            setOpenModal(false)
            navigate(`/inbox/c/${conversationId}`)
       })
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
                  
                    <SearchInput selectedUsers={{
                        get: selectUsers,
                        set: setSelectUsers
                    }}/>
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
            </ModalCustome>
        </>
    )
}