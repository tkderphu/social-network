package viosmash.controller.comment.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import viosmash.pojo.PagingRequest;

@Schema(name = "PagingCommentReqVO")
@Data
public class PagingCommentReqVO extends PagingRequest {
    @Schema(description = "id post")
    private Long postId;
}
