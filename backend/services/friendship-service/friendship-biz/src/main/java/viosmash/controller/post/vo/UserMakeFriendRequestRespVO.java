package viosmash.controller.post.vo;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserMakeFriendRequestRespVO extends UserRespVO{
    private LocalDateTime since;
}
