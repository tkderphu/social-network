package viosmash.controller.vo;

import lombok.Data;

@Data
public class BlockedUserReqVO {
    private Long toUserId;
    private Boolean blockType;
}
