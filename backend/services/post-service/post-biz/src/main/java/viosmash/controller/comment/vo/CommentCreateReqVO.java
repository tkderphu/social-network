package viosmash.controller.comment.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(name = "CommentCreateReq")
public class CommentCreateReqVO {
    private Long postId;
    @Schema(description = "content")
    private String content;
    @Schema(description = "list image")
    private List<String> mediaUrls;
    @Schema(description = "remind to user in comment")
    private Long replyUserId;
    @Schema(description = "root comment which current user is trying to reply someone")
    private Long rootCommentId;
}
