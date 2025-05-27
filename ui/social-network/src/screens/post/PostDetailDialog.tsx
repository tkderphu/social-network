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
import { CommentReq } from "../../services/interaction/commentService";
import { CommentRespVO } from "../../model/interactionModel";
import { createCommentAction, fetchPageCommentByPostAction } from "../../redux/actions/interactionAction";
import { PageResult, TokenUtils } from "../../common";
import { ADD_NEW_COMMENT_TO_PAGE } from "../../redux/constants/interactionConstant";
import Spinner from "../../components/Spinner";
const Post = (props: { post: PostResp }) => {
  const { id } = useParams()
  const [commentReq, setCommentReq] = useState<CommentReq>({
    mediaUrls: [],
    content: "",
    postId: id
  })
  // console.log("postId: ",)
  const dispatch = useDispatch()
  const createCommentState: {
    loading: boolean,
    comment: CommentRespVO,
    hasError: boolean,
    message: any
  } = useSelector((state: any) => {
    return state.createComment
  })
  const [replyComment, setReplyComment] = useState<CommentRespVO | undefined>(undefined)

  const handleComment = () => {
    const req: CommentReq = {
      ...commentReq
    }
    if (replyComment) {
      req.replyCommentId = replyComment.id
    }

    //@ts-ignore
    dispatch(createCommentAction(req))
  }

  useEffect(() => {
    if (createCommentState.comment) {
      console.log("vcl new comment has came")
      dispatch({
        type: ADD_NEW_COMMENT_TO_PAGE,
        payload: createCommentState.comment
      })
      setCommentReq((prev) => ({
        ...prev,
        content: "",
        mediaUrls: [],
        replyCommentId: undefined
      }))
    }
  }, [createCommentState])

  const fetchPageCommentByPost: {
    loading: boolean,
    pageResult: PageResult<CommentRespVO>
    hasError: boolean,
    message: any
  } = useSelector((state: any) => {
    return state.fetchPageCommentByPost
  })

  useEffect(() => {
    if (id) {
      //@ts-ignore
      dispatch(fetchPageCommentByPostAction(id))
    }
  }, [])



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
          <hr style={{ color: "red" }} />
          {/* <p className="text-truncate">-------------------------------------------------------------------------------------------------------------</p> */}
        </div>
        <Spinner loading={fetchPageCommentByPost.loading} />
        {fetchPageCommentByPost.pageResult?.data.map(comment => {
          return (
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex mb-2">
                <img src={comment.user?.avatar} height={50} alt="User" className="rounded-circle me-2" />
                <div>
                  <strong>{comment.user?.firstName + " " + comment.user?.lastName}</strong> {comment.content}<br />
                  <div>
                  {comment.mediaUrls?.map(imageUrl => {
                    return <img className="me-2 mb-2" src={imageUrl} height={100} />
                  })}
                    </div>
                  <small>{comment.time} • {comment.likes} {<i title="Like" style={{cursor: "pointer"}} className="fa fa-heart"  aria-hidden="true"></i>}</small>
                </div>
              </div>
              {comment.user.id == TokenUtils.authLogin.userId && (
                <div className="dropdown">

                  <button className="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    </svg>
                  </button>
                  <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={() => {
                      setCommentReq({
                        content: comment.content,
                        id: comment.id,
                        mediaUrls: comment.mediaUrls
                      })
                    }}>Edit</button></li>
                    <li><button className="dropdown-item" onClick={() => {

                    }}>Delete</button></li>
                  </ul>
                </div>
              )}
            </div>
          )
        })}
        {fetchPageCommentByPost.pageResult?.data.length == 0 && (
          <h4 className="text-center text-muted">No comments yet</h4>
        )}



      </div>

      {/* Bottom Section (Fixed at Bottom, 30% height) */}
      <div className="comment-input  bg-light border-top position-sticky bottom-0 d-flex flex-column" style={{ height: '25%' }}>
        {/* Post Actions */}
        <div className="post-actions d-flex ">
          <button className="btn"><span style={{ fontSize: "20px" }} title="Comment"><i className="fa fa-heart" aria-hidden="true"></i></span></button>
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
            <MediaComponent images={commentReq.mediaUrls} onChange={(images: any) => setCommentReq((prev: any) => ({
              ...prev,
              mediaUrls: images
            }))} />
          </div>
        </div>

        {/* Comment Input */}
        <div className="d-flex align-items-center p-2">
          <div className="btn btn-text text-muted text-primary ms-2">
            <strong>{commentReq.id ? "Edit" : "Create"}</strong>
          </div>
          <input type="text" className="form-control border-0"
            onChange={(e) => { setCommentReq((prev) => ({ ...prev, content: e.target.value })) }}
            placeholder="Add a comment..." value={commentReq.content} />
          <button onClick={handleComment} className="btn btn-text text-muted text-primary ms-2">
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