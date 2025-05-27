package viosmash.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import viosmash.collection.CollUtils;
import viosmash.controller.comment.vo.CommentCreateReqVO;
import viosmash.controller.comment.vo.CommentRespVO;
import viosmash.controller.comment.vo.CommentUpdateReqVO;
import viosmash.dal.dataobject.Comment;
import viosmash.dal.repo.CommentRepository;
import viosmash.exception.ServiceException;
import viosmash.object.BeanUtil;
import viosmash.pojo.PageResult;
import viosmash.profile.api.UserApi;

import java.time.LocalDateTime;
import java.util.List;

import static viosmash.dal.dataobject.Like.ObjectType.COMMENT;
import static viosmash.exception.utils.ServiceUtils.exception;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{
    private final CommentRepository commentRepository;
    private final UserApi userApi;
    private final LikeService likeService;
    @Override
    public CommentRespVO createComment(Long userId, CommentCreateReqVO req) {
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
        return BeanUtil.copy(comment, CommentRespVO.class)
                .setUser(userApi.getUserById(userId));
    }

    @Override
    public PageResult<CommentRespVO> getPageCommentByPost(Long postId, int page, int limit, int sortDate) {
        Page<Comment> pageRe = this.commentRepository.findAllByPostId(
                postId,
                PageRequest.of(page - 1, limit)
                        .withSort((sortDate > 0 ?
                                Sort.by("id").ascending() :
                                Sort.by("id").descending()))
        );

        List<CommentRespVO> comments = CollUtils.convertList(pageRe.getContent(), comment -> {
            return BeanUtil.copy(comment, CommentRespVO.class)
                    .setUser(userApi.getUserById(comment.getUserId()))
                    .setLikes(likeService.countLike(comment.getId(), COMMENT))
                    .setNestedComments(this.commentRepository.countByRootCommentId(comment.getId()));
        });

        return new PageResult<>(page, limit, comments, pageRe.getTotalPages());
    }

    @Override
    public PageResult<CommentRespVO> getPageCommentByRootComment(Long rootCommentId, int page, int limit, int sortDate) {
        Page<Comment> pageRe = this.commentRepository.findAllByRootCommentId(
                rootCommentId,
                PageRequest.of(page - 1, limit)
                        .withSort((sortDate > 0 ?
                                Sort.by("id").ascending() :
                                Sort.by("id").descending()))
        );
        List<CommentRespVO> comments = CollUtils.convertList(pageRe.getContent(), comment -> {
            return BeanUtil.copy(comment, CommentRespVO.class)
                    .setUser(userApi.getUserById(comment.getUserId()))
                    .setLikes(likeService.countLike(comment.getId(), COMMENT));
        });

        return new PageResult<>(page, limit, comments, pageRe.getTotalPages());
    }

    @Override
    @Transactional(rollbackFor = ServiceException.class)
    public void deleteComment(Long commentId) {
        Comment comment = this.commentRepository.findById(commentId)
                .orElseThrow(() -> exception(404, "not found comment"));
        this.commentRepository.delete(comment);
        if(comment.getRootCommentId() == null) {
            CollUtils.convertList(this.commentRepository.findAllByRootCommentId(commentId), cm -> {
                this.commentRepository.delete(cm);
                this.likeService.deleteAllLike(cm.getId(), COMMENT);
                return null;
            });
        } else {
            this.likeService.deleteAllLike(commentId, COMMENT);
        }
    }

    @Override
    public Comment updateComment(Long id, CommentUpdateReqVO req) {
        Comment comment = this.commentRepository.findById(id)
                .orElseThrow(() -> exception(404, "not found comment"))
                .setMediaUrls(req.getMediaUrls())
                .setContent(req.getContent());
        this.commentRepository.save(comment);
        return comment;
    }
}
