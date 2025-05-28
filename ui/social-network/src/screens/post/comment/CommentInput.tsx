import React, { useRef, useState, useEffect } from 'react';
import { CommentRespVO } from '../../../model/interactionModel';
import './CommentInput.css';

interface CommentReq {
  mediaUrls: string[];
  content: string;
  postId: number;
}

interface CommentInputProps {
  replyComment?: CommentRespVO
  onCancelReply?: () => void;
  focusComment?: any
}

const CommentInput: React.FC<CommentInputProps> = ({ focusComment, replyComment, onCancelReply }) => {
  const editableRef = useRef<HTMLDivElement>(null);

  const [commentReq, setCommentReq] = useState<CommentReq>({
    mediaUrls: [],
    content: '',
    postId: 1
  });


  useEffect(() => {
    setTimeout(() => {
        editableRef.current?.focus()
    }, 0)
  }, [focusComment])

  const [currentReplyTo, setCurrentReplyTo] = useState<string | null>(replyComment ? (replyComment?.user?.firstName + " " + replyComment?.user?.lastName) : null);

  useEffect(() => {
    if (replyComment?.user) {
      const mention = `@${replyComment?.user?.firstName + " " + replyComment?.user?.lastName}`;
      setCommentReq((prev) => ({ ...prev, content: mention + ' ' }));
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
      setCommentReq((prev) => ({ ...prev, content: text }));

      // If mention is removed, exit reply mode
      if (currentReplyTo && !text.includes(`@${currentReplyTo}`)) {
        handleCancelReply();
      }
    }
  };

  const handleCancelReply = () => {
    setCurrentReplyTo(null);
    setCommentReq((prev) => ({ ...prev, content: '' }));
    if (editableRef.current) editableRef.current.innerHTML = '';
    onCancelReply?.();
  };

  return (
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
  );
};

export default CommentInput;
