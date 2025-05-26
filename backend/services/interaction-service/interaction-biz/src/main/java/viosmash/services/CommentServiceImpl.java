package viosmash.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.controller.comment.vo.CommentCreateReqVO;
import viosmash.dal.dataobject.Comment;
import viosmash.dal.repo.CommentRepository;
import viosmash.object.BeanUtil;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{
    private final CommentRepository commentRepository;
    @Override
    public Comment createComment(Long userId, CommentCreateReqVO req) {
        Comment comment = BeanUtil.copy(req, Comment.class);
        if(req.getReplyCommentId() != null) {
            Comment replyComment
                    = this.commentRepository.findById(req.getReplyCommentId()).orElse(null);
            if(replyComment.getRootCommentId() == null) {
                comment.setRootCommentId(replyComment.getId())
                        .setReplyCommentId(replyComment.getId());
            } else {
                comment.setRootCommentId(replyComment.getRootCommentId())
                        .setReplyCommentId(replyComment.getId());
            }
        } else {
            comment.setReplyCommentId(null).setRootCommentId(null);
        }
        comment.setCreatedDate(LocalDateTime.now())
                .setUserId(userId);

        this.commentRepository.save(comment);
        return comment;
    }
}
