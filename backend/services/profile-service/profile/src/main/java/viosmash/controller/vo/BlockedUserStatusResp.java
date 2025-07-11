package viosmash.controller.vo;

import lombok.Data;

@Data
    public class BlockedUserStatusResp {
    private Boolean blocked;
    private Direction direction;

    public static enum Direction {
        TO, //current user blocked
        FROM //current user is blocked
    }

    public BlockedUserStatusResp(Boolean blocked, Direction direction) {
        this.blocked = blocked;
        this.direction = direction;
    }
}
