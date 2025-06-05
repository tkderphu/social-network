package viosmash.services;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationContext;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import viosmash.collection.CollUtils;
import viosmash.controller.comment.vo.CommentCreateReqVO;
import viosmash.controller.comment.vo.CommentRespVO;
import viosmash.controller.comment.vo.CommentUpdateReqVO;
import viosmash.dal.dataobject.Comment;
import viosmash.dal.repo.CommentRepository;
import viosmash.interaction.enums.InteractionType;
import viosmash.json.JsonUtils;
import viosmash.object.BeanUtil;
import viosmash.pojo.PageResult;
import viosmash.pojo.api.notification.NotificationDto;
import viosmash.pojo.api.notification.NotificationType;
import viosmash.pojo.api.post.PostDTO;
import viosmash.post.api.PostApi;
import viosmash.profile.api.UserApi;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import static viosmash.exception.utils.ServiceUtils.exception;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{
    private final CommentRepository commentRepository;
    private final UserApi userApi;
    private final LikeService likeService;
    private final InteractionService interactionService;
    private final ApplicationContext applicationContext;
    private final PostApi postApi;
    @Override
    public CommentRespVO createComment(Long userId, CommentCreateReqVO req) {

        Comment comment = BeanUtil.copy(req, Comment.class)
                .setCreatedDate(LocalDateTime.now())
                .setUserId(userId);
        this.commentRepository.save(comment);
        NotificationDto notificationDto = new NotificationDto()
                .setCommentId(req.getReplyCommentId())
                .setFromUserId(userId).setType(NotificationType.CREATED_COMMENT)
                .setPostId(req.getPostId());
        if(req.getReplyCommentId() == null) {
            PostDTO post = postApi.getPostById(req.getPostId());
            notificationDto.setToUserId(post.getUser().getId());
        } else {
            Comment replyComment = this.commentRepository.findById(req.getReplyCommentId())
                    .orElse(null);
            notificationDto.setToUserId(replyComment.getUserId());
        }
        applicationContext.publishEvent(notificationDto);
//        interactionService.addNewInteraction(userId, req.getAuthorId(), InteractionType.COMMENT);
        return BeanUtil.copy(comment, CommentRespVO.class)
                .setUser(userApi.getUserById(userId));
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

    @Override
    public PageResult<CommentRespVO> getPageCommentByPost(Long postId, int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        List<Object[]> results = this.commentRepository.findAllByPostId(postId, limit, (int) pageable.getOffset());
        List<CommentRespVO> commentRespVOS = CollUtils.convertList(results, objs -> {
            return new CommentRespVO()
                    .setId((Long) objs[0])
                    .setContent((String) objs[1])
                    .setMediaUrls(JsonUtils.toObject((String) objs[2], List.class))
                    .setCreatedDate((objs[3] instanceof Timestamp ts) ? ts.toLocalDateTime() : null)
                    .setUser(userApi.getUserById((Long) objs[4]))
                    .setPostId((Long) objs[6])
                    .setDownVote((int)objs[7])
                    .setUpVote((int)objs[8])
                    .setNestedComments((Long) objs[9]);
        });
        return new PageResult<>(page, limit, commentRespVOS);
    }


    @Override
    public PageResult<CommentRespVO> getPageCommentByParentComment(Long parentCommentId, int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        List<Object[]> results = this.commentRepository.findAllByParentComment(parentCommentId, limit, (int) pageable.getOffset());
        List<CommentRespVO> commentRespVOS = CollUtils.convertList(results, objs -> {
            return new CommentRespVO()
                    .setId((Long) objs[0])
                    .setContent((String) objs[1])
                    .setMediaUrls(JsonUtils.toObject((String) objs[2], List.class))
                    .setCreatedDate((objs[3] instanceof Timestamp ts) ? ts.toLocalDateTime() : null)
                    .setUser(userApi.getUserById((Long) objs[4]))
                    .setPostId((Long) objs[6])
                    .setDownVote((int)objs[7])
                    .setUpVote((int)objs[8])
                    .setNestedComments((Long) objs[9]);
        });
        return new PageResult<>(page, limit, commentRespVOS);
    }

    @Override
    public int countByPost(Long postId) {
        return commentRepository.countByPostId(postId);
    }
}
