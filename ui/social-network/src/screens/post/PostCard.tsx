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
    post?: PostResp
}

export const PostContext = createContext<Model | undefined>(undefined)

export const PostCard = (props: PostCardProps) => {
    const navigate = useNavigate()
    const location = useLocation()


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


    return (
        <PostContext.Provider value={{
            post: props.post,
            postStats: {
                get: postStats,
                set: setPostStats
            }
        }}>
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
                                    <Link to={props.ref ? props.ref : "/profile/" + props.post?.user?.id}><h6 className="mb-0">{props.post?.user?.firstName + " " + props.post?.user?.lastName}</h6></Link>
                                    <small className="text-muted">{props.post?.time} ago</small>
                                </div>

                            </div>

                            <PostFeature />
                        </div>

                    </div>
                    <div onClick={() => {
                        navigate(`/posts/${props.post?.id}`, {
                            state: {
                                backgroundLocation: location
                            }
                        })
                    }} style={{ cursor: 'pointer' }}>
                        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                            {props.post?.content}
                        </Markdown>
                    </div>

                    <div className="d-flex justify-content-between border-top pt-2">
                        <PostVote />
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => {
                            navigate(`/posts/${props.post?.id}`, {
                                state: {
                                    backgroundLocation: location
                                }
                            })
                        }} >Comment: {props.post?.postStats?.numberComment || 0}</button>
                        <PostShare />
                    </div>
                </div>
            </div>
        </PostContext.Provider>
    );
};