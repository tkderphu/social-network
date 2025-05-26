package viosmash.services;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.controller.comment.vo.CommentCreateReqVO;
import viosmash.controller.comment.vo.CommentRespVO;
import viosmash.dal.dataobject.Comment;

public interface CommentService{
    Comment createComment(Long userId, CommentCreateReqVO req);
}
