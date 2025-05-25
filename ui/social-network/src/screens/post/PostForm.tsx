import React, { useState } from 'react';
import ModalCustome from '../../components/modal/ModalCustom';
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';
import { useSelector } from 'react-redux';
import FullScreenLoader from '../../components/fullSpinner/FullScreenLoader';

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
interface PostFormProps {
  content: string,
  mediaUrls?: string[],
  postPrivacy: "PUBLIC" | "PRIVATE" | "ONLY_FRIENDS",
  onChange: any,
  onSubmit?: any,
  disabledBtnWrite: boolean
}
export default function PostForm(props: { form?: PostFormProps }) {
  const [file, setFile] = useState(null);


  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const createPostState: {
    loading: boolean,
    post: any,
    success: boolean
  } = useSelector((state: any) => {
    return state.createPost
  })

  // const updatePostState: {
  //   loading: boolean,
  //   post: any,
  //   success: boolean
  // } = 



  return (
    <>


      <div className="container">
        {createPostState.loading && (<FullScreenLoader />)}

        <form >
          <div className='mb-3'>
            <label htmlFor="postType" className="form-label fw-bold">
              Post privacy
            </label>
            <select name='postPrivacy' onChange={props.form?.onChange} className="form-select" value={props.form?.postPrivacy}>
              {POST_PRIVACY.map(privacy => {
                return (
                  <option value={privacy.scope} selected={props.form?.postPrivacy ? (props.form.postPrivacy == privacy.scope) : privacy.checked} >{privacy.show}</option>
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
                  value={props.form?.content}
                  onChange={props.form?.onChange}
                  placeholder="Write your post content..."
                  required
                ></textarea>
              </div>
              <div className='col-5' style={{
                maxHeight: "250px",
                overflowY: 'scroll'
              }}>
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {props.form?.content}
                </Markdown>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="file" className="form-label fw-bold">
              Upload File
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              className="form-control"
              multiple
              id="file"
              onChange={handleFileChange}
            />
          </div>

        </form>
      </div>

    </>
  );
};

