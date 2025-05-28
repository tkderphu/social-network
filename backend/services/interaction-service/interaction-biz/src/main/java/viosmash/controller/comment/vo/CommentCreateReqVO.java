package viosmash.controller.comment.vo;

import lombok.Data;

import java.util.List;

@Data
public class CommentCreateReqVO {
    private String content;
    private List<String> mediaUrls;

    private Long replyCommentId;

    private Long authorId;
    private Long postId;
}
