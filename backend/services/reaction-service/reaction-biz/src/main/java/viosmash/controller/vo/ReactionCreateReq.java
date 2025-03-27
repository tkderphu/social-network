package viosmash.controller.vo;

import lombok.Data;
import viosmash.core.utils.SecurityUtils;
import viosmash.enums.EntityType;
import viosmash.enums.ReactionType;

@Data
public class ReactionCreateReq {
    private ReactionType reactionType;
    private EntityType entityType;
    private Long entityId;

    private Long userId = SecurityUtils.getLoginUserMemberId();

}
