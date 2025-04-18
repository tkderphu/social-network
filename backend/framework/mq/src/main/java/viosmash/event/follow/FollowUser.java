package viosmash.event.follow;

import lombok.Data;
import viosmash.UserDTO;

@Data
public class FollowUser {
    private UserDTO fromUser;
    private Long toUserId;
}
