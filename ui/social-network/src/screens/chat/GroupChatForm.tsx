import React, { useState } from "react";
import { generateGroupAvatar } from "../../utils/utils";

const users = [
    { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" },
];

export default function GroupChatForm() {
    const [groupName, setGroupName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<any>([]);
    const [avatar, setAvatar] = useState("");

    const handleUserChange = (e: any) => {
        const selected = Array.from(e.target.selectedOptions, (option: any) => option.value);
        setSelectedUsers(selected);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        let groupAvatar = avatar;
        if (!avatar) {
            const selectedAvatars = users
                .filter((u) => selectedUsers.includes(String(u.id)))
                .map((u) => u.avatar);
            groupAvatar = await generateGroupAvatar(selectedAvatars);
        }

        const group = {
            name: groupName,
            members: selectedUsers,
            avatar: groupAvatar,
        };

        console.log("New Group:", group);
        alert("Nhóm đã được tạo!");
    };

    return (
        <div className="container mt-4" style={{ maxWidth: "600px" }}>
            <h3 className="mb-4">Tạo nhóm chat</h3>
            <form onSubmit={handleSubmit}>
                {/* Tên nhóm */}
                <div className="mb-3">
                    <label className="form-label">Tên nhóm</label>
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
                    <label className="form-label">Chọn thành viên</label>
                    <select
                        multiple
                        className="form-select"
                        onChange={handleUserChange}
                        required
                    >
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                    <div className="form-text">Giữ Ctrl (Windows) hoặc Cmd (Mac) để chọn nhiều người.</div>
                </div>

                {/* Ảnh đại diện nhóm */}
                <div className="mb-3">
                    <label className="form-label">Link ảnh đại diện nhóm</label>
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

                <button type="submit" className="btn btn-primary">
                    Tạo nhóm
                </button>
            </form>
        </div>
    );
}
