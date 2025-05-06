package viosmash.service;

import viosmash.controller.comment.vo.CommentCreateReqVO;
import viosmash.controller.comment.vo.CommentRespVO;
import viosmash.dal.dataobject.Comment;
import viosmash.pojo.PageResult;

public interface CommentService {
    Comment createComment(Long userId, CommentCreateReqVO req);
    PageResult<CommentRespVO> getPageCommentRespByPost(Long postId, int page, int limit);

}
