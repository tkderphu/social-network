import React, { useEffect, useState } from 'react';
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';
import { PostCreateReq } from '../../services/post/postService';
import { PostCreateReqVO, PostResp } from '../../model/postModel';
import MediaComponent from '../../components/media/MediaComponent';

const POST_PRIVACY = [
    {
        checked: true,
        scope: "PUBLIC",
        show: "Public"
    },
    {
        checked: false,
        scope: "PRIVATE",
        show: "Private"
    },
    {
        checked: false,
        scope: "ONLY_FRIENDS",
        show: "Only friends"
    }
]


interface Props {
    req: {
        get: PostCreateReqVO,
        set: {
            init: any,
            onChange: any
        }
    },
    old?: PostResp
    type: "NEW" | "UPDATE",
}
export default function PostFormCreate(props: Props) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };


    useEffect(() => {
        if (props.type == "UPDATE" && props.old) {
            props.req.set.init({
                ...props.old
            })
        }
    }, [props.old])

    return (
        <>


            <div className="container">
                <form >

                    <div className='mb-3'>
                        <label htmlFor="postType" className="form-label fw-bold">
                            Post privacy
                        </label>
                        <select name='postPrivacy' onChange={props.req.set.onChange} className="form-select" value={props.req.get.postPrivacy}>
                            {POST_PRIVACY.map(privacy => {
                                if (props.req.get.groupId && privacy.scope != "PUBLIC") {
                                    return null
                                }
                                return (
                                    <option value={privacy.scope} selected={props.req.get.postPrivacy ? (props.req.get.postPrivacy == privacy.scope) : privacy.checked} >{privacy.show}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="mb-3">
                        <div className='row'>
                            <div className='col-7'>
                                <label htmlFor="content" className="form-label fw-bold">
                                    Content
                                </label>
                            </div>
                            <div className='col-5 text-center'>
                                <label htmlFor="content-preview" className="form-label fw-bold">
                                    Content preview
                                </label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-7'>
                                <textarea
                                    className="form-control"
                                    id="content"
                                    rows={10}
                                    name="content"
                                    value={props.req.get.content}
                                    onChange={props.req.set.onChange}
                                    placeholder="Write your post content..."
                                    required
                                ></textarea>
                            </div>
                            <div className='col-5' style={{
                                maxHeight: "250px",
                                overflowY: 'scroll'
                            }}>
                                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                    {props.req.get.content}
                                </Markdown>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 text-center">
                        
                        <MediaComponent images={props.req.get.mediaUrls} onChange={(images: any) => {
                            props.req.set.init((prev: any) => ({
                                ...prev,
                                mediaUrls: images
                            }))
                        }} />
                        
                    
                    </div>
                    
                    <div className='d-flex mb-2 flex-wrap'>
                        {props.req.get.mediaUrls?.map(url => {
                            return <img src={url} height={115} className={"rounded mx-3 mb-3"}/>
                        })}
                    </div>
                </form>
            </div>

        </>
    );
};

