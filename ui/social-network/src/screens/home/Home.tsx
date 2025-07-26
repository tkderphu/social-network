import { Link, useLocation, useNavigate } from 'react-router';
import ModalCustome from '../../components/modal/ModalCustom';
import PostForm from '../post/PostForm';
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';
import { PostCreateReqVO, PostResp } from '../../model/postModel';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { CommonResult } from '../../common';
import postService, { PostCreateReq } from '../../services/post/postService';
import { PostCard } from '../post/PostCard';
import PostFormModal from '../post/PostFormModal';
import Contact from './Contact';
import PostFormCreate from '../post/PostForm';
import conversationService, { ConversationRespVO } from '../../services/chat/conversationService';





function Home() {

    const [fetchPostState, setFetchPostState] = useState<{
        posts: PostResp[],
        loading: boolean,
        error: boolean,
        page: number,
        limit: number,
        message: any
    }>({
        posts: [],
        loading: false,
        error: false,
        message: "",
        limit: 100,
        page: 1
    })


    const [postReq, setPostReq] = useState<PostCreateReqVO>({
        content: "",
        postPrivacy: "PUBLIC",
        postType: "TEXT",
        mediaUrls: [],
        tagNames: []
    })

   

    useEffect(() => {
        console.log("=====================new===================")
        setFetchPostState((prev) => ({ ...prev, loading: true }))
        postService.getNewFeeds("user", fetchPostState.page, fetchPostState.limit, 0)
            .then(res => {
                const commonResult: CommonResult<any> = res.data
                console.log("data from newfeed: ", commonResult.data)
                if (commonResult.code == 200) {
                    setFetchPostState((prev) => ({ ...prev, error: false, loading: true, posts: [...prev.posts, ...commonResult.data] }))
                } else {
                    setFetchPostState((prev) => ({ ...prev, loading: false, error: true, message: commonResult.message }))
                }
            }).catch(err => {
                setFetchPostState((prev) => ({ ...prev, loading: false, error: true, message: "Please see console" }))
                console.error("err: ", err)
            })
    }, [fetchPostState.page])



    if (fetchPostState.error) {
        toast.error(fetchPostState.message)
    }


    return (
        <div className="row mt-3">
            <div className="col-8">
                {/* <PostForm /> */}
                <PostFormModal
                    form={
                        <PostFormCreate
                            req={{
                                get: postReq,
                                set: {
                                    init: setPostReq,
                                    onChange: (e: any) => {
                                        
                                    }
                                }
                            }}
                            type={"NEW"}
                        />
                    }
                    onSubmit={() => { }}
                />
                {fetchPostState.posts.map((post, index) => {
                    return <PostCard key={index} post={post} />
                })}
            </div>
            <div className='col-4'>
                <Contact />
            </div>
        </div>
    )
}
export default Home