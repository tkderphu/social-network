package viosmash.controller.reaction.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import viosmash.post.enums.ReactionType;

@Data
@Schema(name = "ReactionUpdateReq")
public class ReactionUpdateReqVO {
    @Schema(description = "id of post or comment")
    private Long reactionTypeId;
    @Schema(description = "post or comment")
    private ReactionType reactionType;
}
