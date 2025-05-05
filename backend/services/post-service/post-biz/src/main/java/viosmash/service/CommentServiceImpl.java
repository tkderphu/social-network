package viosmash.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import viosmash.collection.CollUtils;
import viosmash.controller.comment.vo.CommentCreateReqVO;
import viosmash.controller.comment.vo.CommentRespVO;
import viosmash.controller.comment.vo.PagingCommentReqVO;
import viosmash.dal.dataobject.Comment;
import viosmash.dal.repo.CommentRepository;
import viosmash.date.DateUtils;
import viosmash.object.BeanUtil;
import viosmash.pojo.PageResult;
import viosmash.profile.api.UserApi;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{
    private final CommentRepository commentRepository;
    private final UserApi userApi;
    @Override
    public Long createComment(Long userId, CommentCreateReqVO req) {
        Comment comment = BeanUtil.copy(req, Comment.class)
                .setCreatedDate(LocalDateTime.now())
                .setUserId(userId)
                .setRootComment(req.getRootCommentId() != null ? new Comment().setId(req.getRootCommentId()) : null);

        this.commentRepository.save(comment);
        return comment.getId();
    }

    @Override
    public PageResult<CommentRespVO> getPageCommentResp(PagingCommentReqVO req) {
        Pageable pageable = PageRequest.of(
                req.getPage() - 1,
                req.getLimit(),
                Sort.by("createdDate").descending());

        Page<Object[]> page = commentRepository.findAllByPostId(req.getPostId(), pageable);

        List<CommentRespVO> comments = CollUtils.convertList(page.getContent(), objects -> {
            Comment comment = (Comment) objects[0];
            CommentRespVO commentRespVO = BeanUtil.copy(objects[0], CommentRespVO.class)
                    .setTimeAgo(DateUtils.timeAgo(comment.getCreatedDate()))
                    .setReplyUser(null)
                    .setNumNestedComment((Integer) objects[2])
                    .setNumReaction((Integer) objects[1])
                    .setUser(userApi.getUserById(comment.getUserId()));
            return commentRespVO;
        });

        return new PageResult<>(req.getPage(), req.getLimit(), comments, page.getTotalPages());
    }
}
