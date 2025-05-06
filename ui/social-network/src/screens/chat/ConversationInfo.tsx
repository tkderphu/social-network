import { useState } from "react";

export default function ConversationInfo() {
    const [isNotified, setIsNotified] = useState(false);
    const member = { name: "Jang", username: "trangyoon_7", avatar: "https://via.placeholder.com/40" };

    return (
        <div className="flex h-screen">
            <button
                className="bg-gray-800 text-white p-2 rounded"
                onClick={() => {
                    //@ts-ignore
                    document.getElementById('offcanvasInfo').classList.add('show')
                }}
            >
                Open Info
            </button>
            <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasInfo" aria-labelledby="offcanvasInfoLabel">
                <div className="offcanvas-header">
                    <h5 className="text-xl font-bold" id="offcanvasInfoLabel">Chi tiết</h5>
                    <button
                        type="button"
                        className="btn-close text-white"
                        onClick={() => {
                            //@ts-ignore
                            document.getElementById('offcanvasInfo').classList.remove('show')
                        }}
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <div className="mb-4">
                        <h6 className="text-lg">Thông báo</h6>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-600"
                                checked={isNotified}
                                onChange={() => setIsNotified(!isNotified)}
                            />
                            <span className="ml-2">Tắt thông báo về tin nhắn</span>
                        </label>
                    </div>
                    <div className="mb-4">
                        <h6 className="text-lg">Thành viên</h6>
                        <div className="flex items-center">
                            <img src={member.avatar} alt={member.name} className="rounded-full w-10 h-10 mr-2" />
                            <div>
                                <h6 className="font-semibold">{member.name}</h6>
                                <p className="text-gray-400">@{member.username}</p>
                            </div>
                        </div>
                    </div>
                    <button className="w-full bg-red-600 text-white py-2 rounded mb-2">Báo cáo</button>
                    <button className="w-full bg-red-600 text-white py-2 rounded">Xóa đoạn chat</button>
                </div>
            </div>
        </div>
    );
}