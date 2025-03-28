package viosmash.controller.vo;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import viosmash.core.utils.SecurityUtils;
import viosmash.enums.EntityType;
import viosmash.enums.ReactionType;

@Data
public class ReactionCreateReq {
    @NotNull
    private ReactionType reactionType;
    @NotNull
    private EntityType entityType;
    @NotNull
    private Long entityId;

    @NotNull
    private Long userId = SecurityUtils.getLoginUserMemberId();

}
