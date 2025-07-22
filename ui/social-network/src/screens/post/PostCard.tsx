import { Link, useLocation, useNavigate } from 'react-router';

import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';
import { PostResp } from '../../model/postModel';
import { createContext, useEffect, useState } from 'react';

import PostVote from './PostVote';
import PostShare from './PostShare';
import PostFeature from './PostFeature';

interface PostCardProps {
    post?: PostResp,
    ref?: "",
}


interface Model {
    postStats?: {
        get: any,
        set: any
    }
    post?: {
        get?: PostResp,
        set: any
    }
}

export const PostContext = createContext<Model | undefined>(undefined)

export const PostCard = (props: PostCardProps) => {
    const navigate = useNavigate()
    const location = useLocation()

    const [post, setPost] = useState<PostResp>()

    useEffect(() => {
        setPost(props.post)
    }, [props.post])

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


    console.log("after set: ", post)

    return (
        <PostContext.Provider value={{
            post: {
                get: post,
                set: setPost
            },
            postStats: {
                get: postStats,
                set: setPostStats
            }
        }}>
            <div className="card mb-3">
                <div className="card-body">
                    <div className='d-flex flex-column'>
                        <div className='text-muted'><strong>{post?.postPrivacy}</strong></div>
                        <div className='d-flex justify-content-between '>
                            <div className="d-flex align-items-center mb-3">
                                <img
                                    src={post?.user?.avatar}
                                    alt="User avatar"
                                    className="rounded-circle me-2"
                                    style={{ width: '40px', height: '40px' }}
                                />
                                <div>
                                    <Link to={props.ref ? props.ref : "/profile/" + post?.user?.id}><h6 className="mb-0">{post?.user?.firstName + " " + post?.user?.lastName}</h6></Link>
                                    <small className="text-muted">{post?.time} ago</small>
                                </div>
                            </div>
                            {post?.group && (
                                <div>
                                    <Link className='text-decoration-none' to={`/groups/${post?.group.id}`}>{post?.group.name}</Link>
                                </div>
                            )}
                            <PostFeature />
                        </div>

                    </div>
                    <div onClick={() => {
                        navigate(`/posts/${post?.id}`, {
                            state: {
                                backgroundLocation: location
                            }
                        })
                    }} style={{ cursor: 'pointer' }}>
                        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                            {post?.content}
                        </Markdown>
                    </div>

                    <div className="d-flex justify-content-between border-top pt-2">
                        <PostVote />
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => {
                            navigate(`/posts/${post?.id}`, {
                                state: {
                                    backgroundLocation: location
                                }
                            })
                        }} >Comment: {post?.postStats?.numberComment || 0}</button>
                        <PostShare />
                    </div>
                </div>
            </div>
        </PostContext.Provider>
    );
};