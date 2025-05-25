import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import "./Post.css";
import { PostResp } from "../../model/postModel";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostByIdAction } from "../../redux/actions/postAction";
import FullScreenLoader from "../../components/fullSpinner/FullScreenLoader";
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';
import { formatDate } from "../../utils/common";
import MediaComponent from "../../components/media/MediaComponent";
const Post = (props: { post: PostResp }) => {
  const [commentReq, setCommentReq] = useState<any>({
    images: []
  })
  return (
    <div className="post-container d-flex flex-column position-relative" style={{ height: '100%' }}>
      {/* Header (Fixed at Top, 10% height) */}
      <div className="post-header d-flex align-items-center p-2 bg-light border-bottom position-sticky top-0" style={{ height: '10%' }}>
        <img src={props.post?.user?.avatar} alt="Profile" />
        <div className="ms-2">
          <strong>{props.post?.user?.firstName + " " + props.post?.user?.lastName}</strong>
        </div>
        <div className="ms-auto">
          <button className="btn btn-sm btn-outline-primary" title="Follow">
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
        
      </div>
      
      {/* Comments (Scrollable Section, 60% height) */}
      <div className="comments-section p-2" style={{ height: '65%', overflowY: 'auto', overflowX: 'hidden' }}>
        <div className="p-2">
          <div className="text-truncate">
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {props.post?.content}
            </Markdown>
          </div>
          <hr   style={{color: "red"}} />
          {/* <p className="text-truncate">-------------------------------------------------------------------------------------------------------------</p> */}
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

      </div>

      {/* Bottom Section (Fixed at Bottom, 30% height) */}
      <div className="comment-input  bg-light border-top position-sticky bottom-0 d-flex flex-column" style={{ height: '25%' }}>
        {/* Post Actions */}
        <div className="post-actions d-flex ">
          <button className="btn"><span style={{ fontSize: "20px" }} title="Like">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
           2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
           4.5 2.09C13.09 3.81 14.76 3 16.5 
           3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
           6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </span></button>
          <button className="btn"><span style={{ fontSize: "20px" }} title="Comment">💬</span></button>
          <button className="btn"><span style={{ fontSize: "20px" }} title="Share">📤</span></button>

        </div>

        {/* Likes */}
       <div className="d-flex justify-content-between align-items-center">
       <div className="ms-2 mb-1 d-flex flex-column">
          <strong>17,109 likes</strong>
          <span className="text-muted">{props.post?.time} ago</span>
        </div>
        <div>
          <MediaComponent images={commentReq.images} onChange={(images: any) => setCommentReq((prev: any) => ({
            ...prev,
            images: images
          }))} />
        </div>
       </div>

        {/* Comment Input */}
        <div className="d-flex align-items-center p-2">
          <input type="text" className="form-control border-0" placeholder="Add a comment..." />
          <button className="btn btn-text text-muted text-primary ms-2">
            <strong>Post</strong>
          </button>
        </div>
      </div>
    </div>
  );
};

const ImageList = (props: { images: string[] }) => {
  const images = (props.images == undefined || props.images.length == 0) ? [
    "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"
  ] : props.images

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

  const fetchPostByIdState: {
    loading: boolean,
    post: PostResp,
    hasError: boolean,
    message: any
  } = useSelector((state: any) => {
    return state.fetchPostById
  })

  // console.log("postId: ", id)

  const dispatch = useDispatch()
  useEffect(() => {
    if (id) {
      //@ts-ignore
      dispatch(fetchPostByIdAction(id))
    }
  }, [])
  return (
    <>
      {fetchPostByIdState.loading && <FullScreenLoader />}
      <div className="modal">
        <div className="modal-content">
          <div className="row h-100">
            {/* Left Side: Image List with Navigation */}
            <div className="col-md-6">
              <ImageList images={fetchPostByIdState.post?.mediaUrls} />
            </div>
            {/* Right Side: Post Details */}
            <div className="col-md-6 d-flex flex-column h-100">
              <Post post={fetchPostByIdState.post} />
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
    </>
  );
};

export default PostDetailDialog;