package viosmash.controller.member.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Collection;

@Data
@Schema(name = "MemberInviteReqVO")
public class MemberInviteReqVO {
    @Schema(description = "conversation id", defaultValue = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long conversationId;
    @Schema(description = "list user id", requiredMode = Schema.RequiredMode.REQUIRED)
    private Collection<Long> userIds;
}
