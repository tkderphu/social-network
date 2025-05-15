import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import Alert from "../../components/Alert";
import ModalCustome from "../../components/modal/ModalCustom";
import Spinner from "../../components/Spinner";
import { fetchListConversationAction } from "../../redux/actions/chatAction";
import { ConversationCreateReq } from "../../services/chat/conversationService";
import { useStompClient } from "../../utils/useStomp";

const users = [
    { value: 1, label: { name: "Alice", avatar: "https://i.pravatar.cc/150?img=1" }},
    { value: 2, label: {name: "Bob", avatar: "https://i.pravatar.cc/150?img=2" }},
    { value: 3, label: {name: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" }},
];
export default function CreateConversationForm() {
    const [openModal, setOpenModal] = useState(false)
    const [groupName, setGroupName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<any>([]);
    const [avatar, setAvatar] = useState("");
    const handleUserChange = (e: any) => {
        const selected = Array.from(e.target.selectedOptions, (option: any) => option.value);
        setSelectedUsers(selected);
    };

    const stompClient = useStompClient({ path: "chat/ws" })

    const { loading, hasError, message, success } = useSelector((state: any) => {
        return state.createConversation
    })

    const dispatch = useDispatch()

    const onSave = () => {
        const conReq: ConversationCreateReq = {
            type: "PUBLIC",
            userIds: selectedUsers,
            name: groupName,
            thumbnail: avatar
        }
        console.log(conReq)
        //@ts-ignore
        dispatch(createConversationAction(conversationCreateReq))
    }

    if(success) {
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
                    <Select
                        isMulti
                        options={users}
                        value={selectedUsers}
                        onChange={setSelectedUsers}
                        placeholder="Choose users..."
                        getOptionLabel={(e) => `${e.label.name}`}
                        closeMenuOnSelect={false}
                        
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