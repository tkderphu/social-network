import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import "./Post.css";

const Post = () => {
  return (
    <div className="post-container d-flex flex-column position-relative" style={{ height: '100%' }}>
      {/* Header (Fixed at Top, 10% height) */}
      <div className="post-header d-flex align-items-center p-2 bg-light border-bottom position-sticky top-0" style={{ height: '10%' }}>
        <img src="https://via.placeholder.com/40" alt="Profile" />
        <div className="ms-2">
          <strong>shasha_04321</strong>
        </div>
        <div className="ms-auto">
          <button className="btn btn-sm btn-outline-primary" title="Follow">
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>

      {/* Comments (Scrollable Section, 60% height) */}
      <div className="comments-section p-2" style={{ height: '70%', overflowY: 'auto', overflowX: 'hidden' }}>
        <div className="p-2">
          <strong>shasha_04321</strong> Dragon<br />
          #commission #artist #digitalartists #art #painting #drawings #procreatedoodle #illustrationoninstagram
        </div>
        <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div>
        <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div>
        <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div>
        <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div>
        <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div>
        <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div>
        <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div>
        <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div>
        <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div> <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div>
        <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div>
        <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div>
        <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div>
        <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>artistic_group</strong> BEAUTIFUL 🔥🔥🔥 OHMYGAWD IT'S SO DETAILED AND BEAUTIFUL<br />
            <small>1w • 1 like</small>
          </div>
        </div>
        <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>hanin_nie</strong> YOUR ART IS SO PERFECT IM GONNA CRY<br />
            <small>2w • 19 likes</small>
          </div>
        </div>
        <div className="d-flex mb-2">
          <img src="https://via.placeholder.com/32" alt="User" className="rounded-circle me-2" />
          <div>
            <strong>canasarts</strong> nice<br />
            <small>2w • 1 like</small>
          </div>
        </div>
      </div>

      {/* Bottom Section (Fixed at Bottom, 30% height) */}
      <div className="comment-input p-2 bg-light border-top position-sticky bottom-0 d-flex flex-column" style={{ height: '20%' }}>
        {/* Post Actions */}
        <div className="post-actions d-flex p-2">
          <img src="https://via.placeholder.com/24?text=❤️" alt="Like" />
          <img src="https://via.placeholder.com/24?text=💬" alt="Comment" />
          <img src="https://via.placeholder.com/24?text=📤" alt="Share" />
        </div>

        {/* Likes */}
        <div className="p-2">
          <strong>17,109 likes</strong>
        </div>

        {/* Comment Input */}
        <div className="d-flex align-items-center">
          <input type="text" className="form-control border-0" placeholder="Add a comment..." />
          <button className="btn btn-text text-muted text-primary ms-2">
            <strong>Post</strong>
          </button>
        </div>
      </div>
    </div>
  );
};

const ImageList = () => {
  const images = [
    "https://cdn2.fptshop.com.vn/unsafe/hinh_nen_songoku_420cb0897a.jpg",
    "https://wibu.com.vn/wp-content/uploads/2024/04/Son-Goku-Super-Saiyan-2.png",
    "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/06/anh-songoku-5.jpg",
    "https://via.placeholder.com/300x200?text=Image+4",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="image-list">
      <div className="nav-buttons">
        <button className="btn btn-outline-secondary" onClick={handlePrev}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <button className="btn btn-outline-secondary" onClick={handleNext}>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
      />
    </div>
  );
};

const PostDetailDialog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const closeDialog = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="row h-100">
          {/* Left Side: Image List with Navigation */}
          <div className="col-md-6">
            <ImageList />
          </div>
          {/* Right Side: Post Details */}
          <div className="col-md-6 d-flex flex-column h-100">
            <Post />
          </div>
        </div>
      </div>
      <button
          type="button"
          className="btn-close position-absolute top-0 end-0 m-2"
          aria-label="Close"
          onClick={closeDialog}
        ></button>
    </div>
  );
};

export default PostDetailDialog;