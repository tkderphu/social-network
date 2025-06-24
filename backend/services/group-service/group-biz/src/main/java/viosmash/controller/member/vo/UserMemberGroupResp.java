package viosmash.controller.member.vo;

import lombok.Data;
import viosmash.date.DateUtils;
import viosmash.group.enums.GroupRole;
import viosmash.pojo.api.profile.UserDTO;

import java.time.LocalDateTime;

@Data
public class UserMemberGroupResp {
    private Long id;
    private UserDTO user;
    private GroupRole groupRole;
    private LocalDateTime joined;
    public String getTimeAgo() {
        return DateUtils.timeAgo(joined);
    }
}
