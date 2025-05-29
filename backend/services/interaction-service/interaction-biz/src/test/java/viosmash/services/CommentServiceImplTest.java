package viosmash.services;

import lombok.extern.slf4j.Slf4j;
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

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
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

        this.commentRepository.save(new2);
        LikeUpdateReqVO reqVO = new LikeUpdateReqVO();
        reqVO.setObjectId(new2.getId());
        reqVO.setObjectType(Like.ObjectType.COMMENT);
        this.likeService.updateLike(2l, reqVO);

        CommentCreateReqVO req = RandomUtils.randomObject(CommentCreateReqVO.class, c -> {
            c.setReplyCommentId(new2.getId());
        });
        CommentRespVO newcomment = this.commentService.createComment(1l, req);

//        this.commentService.deleteComment(comment.getId());

        boolean b = likeService.checkLike(2l, new2.getId(), Like.ObjectType.COMMENT);
//        PageResult<CommentRespVO> pageCommentByRootComment = this.commentService.getPageCommentByRootComment(comment.getId(), 1, 10, -1);
//        Assertions.assertEquals(b, false);
//        Assertions.assertEquals(pageCommentByRootComment.getData().size(), 0);


    }

    @Test
    public void testJpaFetchComment() {
        Long postId = 3l;
        Comment comment1 = new Comment().setPostId(postId);
        this.commentRepository.save(comment1);
        Comment comment2 = new Comment().setPostId(postId).setReplyCommentId(comment1.getId());
        this.commentRepository.save(comment2);

        Comment comment3 = new Comment().setPostId(postId).setReplyCommentId(comment1.getId());
        this.commentRepository.save(comment3);

        Comment comment4 = new Comment().setPostId(postId).setReplyCommentId(comment1.getId());
        this.commentRepository.save(comment4);

        Comment comment5 = new Comment().setPostId(postId).setReplyCommentId(comment2.getId());
        this.commentRepository.save(comment5);

        Comment comment6 = new Comment().setPostId(postId).setReplyCommentId(comment2.getId());
        this.commentRepository.save(comment6);

        Comment comment7 = new Comment().setPostId(postId).setReplyCommentId(comment2.getId());
        this.commentRepository.save(comment7);

        Comment comment8 = new Comment().setPostId(postId).setReplyCommentId(comment7.getId());
        this.commentRepository.save(comment8);

        Comment comment9 = new Comment().setPostId(postId).setReplyCommentId(comment7.getId());
        this.commentRepository.save(comment9);

        Comment comment10 = new Comment().setPostId(postId);
        this.commentRepository.save(comment10);
        Comment comment12 = new Comment().setPostId(postId).setReplyCommentId(comment10.getId());
        this.commentRepository.save(comment12);
        Comment comment11 = new Comment().setPostId(postId).setReplyCommentId(comment12.getId());
        this.commentRepository.save(comment11);
        List<Object[]> allByPostId = this.commentRepository.findAllByPostId(postId, 20, 0);
        List<Object[]> allByParentId = this.commentRepository.findAllByParentComment(comment2.getId(), 20, 0);

        log.info("resp: {}", allByPostId);

        log.info("comment reply: {}", allByParentId);

        Assertions.assertEquals(allByPostId.size(), 2);
        Assertions.assertEquals((Long) allByPostId.get(0)[allByPostId.get(0).length - 1], 8);
        Assertions.assertEquals((Long) allByPostId.get(1)[allByPostId.get(1).length - 1], 2);

        Assertions.assertEquals(allByParentId.size(), 3);
        Assertions.assertEquals((Long) allByParentId.get(2)[allByParentId.get(2).length - 1], 2l);

    }

}