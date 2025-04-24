// PostDetailDialog.tsx
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import "./Post.css"
const PostDetailDialog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const closeDialog = () => {
    navigate(-1); // quay lại trang trước
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Chi tiết bài viết {id}</h2>
        <button onClick={closeDialog}>Đóng</button>
      </div>
    </div>
  );
};

export default PostDetailDialog;
