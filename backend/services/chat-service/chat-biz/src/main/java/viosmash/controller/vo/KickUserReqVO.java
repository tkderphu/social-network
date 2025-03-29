package viosmash.controller.vo;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Collection;

@Data
public class KickUserReqVO {
    @NotNull
    private Long conversationId;
    @NotNull
    private Collection<Long> userIds;
}
