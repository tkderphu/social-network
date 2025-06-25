package viosmash.controller.member.vo;

import lombok.Data;
import viosmash.group.enums.GroupRole;

@Data
public class UserMemberGroupRoleUpdateReq {
    private Long memberId;
    private GroupRole groupRole;
}
