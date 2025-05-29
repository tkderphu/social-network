package viosmash.services;

import viosmash.controller.comment.vo.CommentCreateReqVO;
import viosmash.controller.comment.vo.CommentRespVO;
import viosmash.controller.comment.vo.CommentUpdateReqVO;
import viosmash.dal.dataobject.Comment;
import viosmash.pojo.PageResult;

public interface CommentService{
    CommentRespVO createComment(Long userId, CommentCreateReqVO req);
//    PageResult<CommentRespVO> getPageCommentByPost(Long postId, int page, int limit, int sortDate);
//    PageResult<CommentRespVO> getPageCommentByRootComment(Long rootCommentId, int page, int limit, int sortDate);
//    void deleteComment(Long commentId);
    Comment updateComment(Long id, CommentUpdateReqVO req);
    PageResult<CommentRespVO> getPageCommentByPost(Long postId, int page, int limit);
    PageResult<CommentRespVO> getPageCommentByParentComment(Long parentCommentId, int page, int limit);
    int countByPost(Long postId);
}
