package viosmash.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import viosmash.BaseTest;
import viosmash.controller.comment.vo.CommentCreateReqVO;
import viosmash.controller.comment.vo.CommentRespVO;
import viosmash.controller.like.vo.LikeUpdateReqVO;
import viosmash.dal.dataobject.Comment;
import viosmash.dal.dataobject.Like;
import viosmash.dal.repo.CommentRepository;
import viosmash.pojo.PageResult;
import viosmash.random.RandomUtils;

import static org.junit.jupiter.api.Assertions.*;

class CommentServiceImplTest extends BaseTest {

    @Autowired
    private CommentService commentService;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private LikeService likeService;

    @Test
    void createComment() {
//        Comment comment = new Comment();
        CommentCreateReqVO req = RandomUtils.randomObject(CommentCreateReqVO.class, c -> {
            c.setReplyCommentId(null);
        });
        CommentRespVO comment = this.commentService.createComment(1l, req);
        Assertions.assertNull(comment.getReplyCommentId());
        Assertions.assertNull(comment.getRootCommentId());
    }
    @Test
    void createComment1() {
        Comment comment = new Comment();
        this.commentRepository.save(comment);
        CommentCreateReqVO req = RandomUtils.randomObject(CommentCreateReqVO.class, c -> {
            c.setReplyCommentId(comment.getId());
        });
        CommentRespVO newcomment = this.commentService.createComment(1l, req);
        Assertions.assertEquals(newcomment.getReplyCommentId(), comment.getId());
        Assertions.assertEquals(newcomment.getRootCommentId(), comment.getId());
    }

    @Test
    void createComment2() {
        Comment comment = new Comment();
        this.commentRepository.save(comment);
        Comment new2 = new Comment();
        new2.setReplyCommentId(comment.getId());
        new2.setRootCommentId(comment.getId());
        this.commentRepository.save(new2);
        CommentCreateReqVO req = RandomUtils.randomObject(CommentCreateReqVO.class, c -> {
            c.setReplyCommentId(new2.getId());
        });
        CommentRespVO newcomment = this.commentService.createComment(1l, req);
        Assertions.assertEquals(newcomment.getReplyCommentId(), new2.getId());
        Assertions.assertEquals(newcomment.getRootCommentId(), comment.getId());
    }



    @Test
    void deleteComment() {
        Comment comment = new Comment();
        this.commentRepository.save(comment);
        Comment new2 = new Comment();
        new2.setReplyCommentId(comment.getId());
        new2.setRootCommentId(comment.getId());

        this.commentRepository.save(new2);
        LikeUpdateReqVO reqVO = new LikeUpdateReqVO();
        reqVO.setObjectId(new2.getId());
        reqVO.setObjectType(Like.ObjectType.COMMENT);
        this.likeService.updateLike(2l, reqVO);

        CommentCreateReqVO req = RandomUtils.randomObject(CommentCreateReqVO.class, c -> {
            c.setReplyCommentId(new2.getId());
        });
        CommentRespVO newcomment = this.commentService.createComment(1l, req);

        this.commentService.deleteComment(comment.getId());

        boolean b = likeService.checkLike(2l, new2.getId(), Like.ObjectType.COMMENT);
        PageResult<CommentRespVO> pageCommentByRootComment = this.commentService.getPageCommentByRootComment(comment.getId(), 1, 10, -1);
        Assertions.assertEquals(b, false);
        Assertions.assertEquals(pageCommentByRootComment.getData().size(), 0);


    }
}