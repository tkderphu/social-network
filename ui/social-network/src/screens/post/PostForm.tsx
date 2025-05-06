import React, { useState } from 'react';
import ModalCustome from '../../components/modal/ModalCustom';
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';
export default function PostForm() {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission (e.g., send content and file to server)
    console.log('Content:', content);
    console.log('File:', file);
    // Reset form
    setContent('');
    setFile(null);
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const [showDialog, setShowDialog] = useState(true)
  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <img
              src="https://via.placeholder.com/40"
              alt="User avatar"
              className="rounded-circle me-2"
              style={{ width: '40px', height: '40px' }}
            />
            <input
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log("vcl")
                setShowDialog(true)
              }}
              className="form-control"
              placeholder="What's on your mind?"
            // disabled
            ></input>
          </div>
        </div>
      </div>
      <ModalCustome
        title='Post form'
        show={showDialog}
        onSave={() => {

        }}
        onClose={() => setShowDialog(false)}
        children={
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="content" className="form-label fw-bold">
                  Content
                </label>
                <div className='row'>
                  <div className='col-7'>
                    <textarea
                      className="form-control"
                      id="content"
                      rows={10}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your post content..."
                      required
                    ></textarea>
                  </div>
                  <div className='col-5' style={{
                    maxHeight: "250px",
                    overflowY: 'scroll'
                  }}>
                    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {content}
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
                  className="form-control"
                  id="file"
                  onChange={handleFileChange}
                />
              </div>

            </form>
          </div>
        }
      />
    </>
  );
};

