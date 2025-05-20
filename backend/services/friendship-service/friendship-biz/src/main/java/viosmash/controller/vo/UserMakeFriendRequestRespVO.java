package viosmash.controller.vo;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class UserMakeFriendRequestRespVO extends UserRespVO{
    private LocalDateTime since;
}
