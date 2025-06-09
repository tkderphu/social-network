import { Link, useLocation, useNavigate } from 'react-router';

import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';
import { PostResp } from '../../model/postModel';
import ModalCustome from '../../components/modal/ModalCustom';
import PostForm from './PostForm';
import { useEffect, useState } from 'react';
import { PostCreateReq } from '../../services/post/postService';
import { useDispatch, useSelector } from 'react-redux';
import { updateVote } from '../../redux/actions/interaction/voteAction';
import voteService from '../../services/interaction/voteService';
import FullScreenLoader from '../../components/fullSpinner/FullScreenLoader';
interface PostCardProps {
    post: PostResp
}
export const PostCard = (props: PostCardProps) => {
    const navigate = useNavigate()
    const location = useLocation()
    //@ts-ignore
    const [postReq, setPostReq] = useState<PostCreateReq>({
        ...props.post
    })
    const dispatch = useDispatch()
    const updateVoteState: {
        loading: boolean
    } = useSelector((state: any) => {
        return state.updateVote
    })
    const [postStats, setPostStats] = useState<{
        comments: number,
        scores: number
        shares: number,
        checkUser: number
    }>({
        comments: 0,
        scores: 0,
        shares: 0,
        checkUser: 0
    })

    useEffect(() => {
        fetchComments()
        fetchShares()
    }, [])

    useEffect(() => {
        fetchScores()
        checkUser()
    }, [updateVoteState])


    const fetchComments = () => {

    }

    const checkUser = () => {
        voteService.checkVote(props.post.id, "POST").then((res) => {
            setPostStats((prev) => ({ ...prev, "checkUser": res.data.data }))
        })
    }

    const fetchScores = () => {
        voteService.count(props.post.id, "POST").then(resp => {
            setPostStats((prev) => ({ ...prev, "scores": resp.data.data || 0 }))
        })
    }

    const fetchShares = () => {

    }


    const [openModal, setOpenModal] = useState(false)
    return (
        <>
       {updateVoteState.loading &&  <FullScreenLoader/>}
        <div className="card mb-3">
            <div className="card-body">
                <div className='d-flex flex-column'>
                    <div className='text-muted'><strong>{props.post?.postPrivacy}</strong></div>
                    <div className='d-flex justify-content-between'>
                        <div className="d-flex align-items-center mb-3">
                            <img
                                src={props.post?.user?.avatar}
                                alt="User avatar"
                                className="rounded-circle me-2"
                                style={{ width: '40px', height: '40px' }}
                            />
                            <div>
                                <Link to={"/profile/" + props.post?.user?.id}><h6 className="mb-0">{props.post?.user?.firstName + " " + props.post?.user?.lastName}</h6></Link>
                                <small className="text-muted">{props.post.time} ago</small>
                            </div>

                        </div>
                        {/* <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-target="#navbarNavDarkDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown button
                            </button>
                            <ul className="dropdown-menu" id="navbarNavDarkDropdown">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div> */}
                        <button className='btn btn-light' onClick={() => {
                            setOpenModal(true)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                            </svg>
                        </button>
                        <ModalCustome title='Update post' show={openModal} onClose={() => {
                            setOpenModal(false)
                        }}>

                            <PostForm form={{
                                ...props.post,
                                disabledBtnWrite: false,
                                onChange: (e: any) => {
                                    setPostReq((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value
                                    }))
                                },
                                onSubmit: () => {

                                },
                            }} />
                        </ModalCustome>

                    </div>

                </div>
                <div onClick={() => {
                    navigate(`/posts/${props.post?.id}`, {
                        state: {
                            backgroundLocation: location
                        }
                    })
                }} style={{ cursor: 'pointer' }}>
                    {/* <div dangerouslySetInnerHTML={{ __html: window.marked ? window.marked.parse(content) : content }} /> */}
                    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {props.post?.content}
                    </Markdown>                        {/* <p className="card-text">{content}</p> */}
                </div>

                <div className="d-flex justify-content-between border-top pt-2">
                    <div className="d-flex align-items-center">
                        <button className={`btn btn-sm ${postStats.checkUser == -1 ? "btn-danger" : "btn-outline-primary"}`} onClick={() => {
                            //@ts-ignore
                            dispatch(updateVote({
                                objectId: props.post.id,
                                objectType: "POST",
                                voteType: "DOWN"
                            }))
                        }}><i className="bi bi-arrow-down"></i></button>
                        <div style={{ color: "red" }} className={"me-2 mx-2"}>{postStats.scores}</div>
                        <button className={`btn btn-sm ${postStats.checkUser == 1 ? "btn-danger" : "btn-outline-primary"}`} onClick={() => {
                            //@ts-ignore
                            dispatch(updateVote({
                                objectId: props.post.id,
                                objectType: "POST",
                                voteType: "UP"
                            }))
                        }}><i className="bi bi-arrow-up"></i></button>
                    </div>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => {
                        navigate(`/posts/${props.post?.id}`, {
                            state: {
                                backgroundLocation: location
                            }
                        })
                    }} >Comment: {props.post?.postStats?.numberComment || 0}</button>
                    <button className="btn btn-sm btn-outline-info">Share: {props.post?.postStats?.numberShare || 0}</button>
                </div>
            </div>
        </div>
        </>
    );
};