import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { CommentRespVO } from '../../../model/interactionModel';
import { CommentReq } from '../../../services/interaction/commentService';
import './CommentInput.css';


interface CommentInputProps {
  replyComment?: CommentRespVO
  onCancelReply?: () => void;
  focusComment?: any,
  commentReq: CommentReq,
  setCommentReq: any,
  success?: boolean
}

const CommentInput: React.FC<CommentInputProps> = ({ focusComment, replyComment, success, onCancelReply, setCommentReq }) => {
  const editableRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    setTimeout(() => {
      editableRef.current?.focus()
    }, 0)
  }, [focusComment])

  const [currentReplyTo, setCurrentReplyTo] = useState<string | null>(replyComment ? (replyComment?.user?.firstName + " " + replyComment?.user?.lastName) : null);

  useEffect(() => {
    if (replyComment?.user) {
      const mention = `@${replyComment?.user?.firstName + " " + replyComment?.user?.lastName}`;
      setCommentReq((prev: any) => ({ ...prev, content: mention + ' ', replyCommentId: replyComment.id }));
      setCurrentReplyTo(replyComment?.user?.firstName + " " + replyComment?.user?.lastName);

      // Add mention to contentEditable manually
      if (editableRef.current) {
        editableRef.current.innerHTML = `<span class="mention">${mention}</span>&nbsp;`;
        editableRef.current.focus()
        placeCursorAtEnd(editableRef.current);
      }
    }
  }, [replyComment]);

  const placeCursorAtEnd = (element: HTMLElement) => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  const handleInput = () => {
    if (editableRef.current) {
      const text = editableRef.current.innerText;
      setCommentReq((prev: any) => ({ ...prev, content: text }));

      // If mention is removed, exit reply mode
      if (currentReplyTo && !text.includes(`@${currentReplyTo}`)) {
        handleCancelReply();
      }
    }
  };

  const handleCancelReply = () => {
    setCurrentReplyTo(null);
    setCommentReq((prev: any) => ({ ...prev, content: '', replyCommentId: undefined }));
    if (editableRef.current) editableRef.current.innerHTML = '';
    onCancelReply?.();
  };


  useEffect(() => {
    if(success) {
      if (editableRef.current) editableRef.current.innerHTML = '';
    }
  }, [success])

  return (
    <>
      <div className="reply-container">
        {currentReplyTo && (
          <button className="close-button" onClick={handleCancelReply} title="Cancel reply">
            <i className="fa fa-close"></i>
          </button>
        )}
        <div
          ref={editableRef}
          className="input-box"
          contentEditable
          onInput={handleInput}
          suppressContentEditableWarning={true}
          role="textbox"
        ></div>
      </div>
      {/* <button onClick={() => {
        onSubmit()
        
      }} className="btn btn-text text-muted text-primary ms-2">
        <strong>Send</strong>
      </button> */}
    </>
  );
};

export default CommentInput;
