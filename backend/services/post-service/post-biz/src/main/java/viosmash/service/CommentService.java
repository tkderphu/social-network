package viosmash.service;

import viosmash.controller.comment.vo.CommentCreateReqVO;
import viosmash.controller.comment.vo.CommentRespVO;
import viosmash.controller.comment.vo.PagingCommentReqVO;
import viosmash.pojo.PageResult;

public interface CommentService {
    Long createComment(Long userId, CommentCreateReqVO req);
    PageResult<CommentRespVO> getPageCommentResp(PagingCommentReqVO req);

}
