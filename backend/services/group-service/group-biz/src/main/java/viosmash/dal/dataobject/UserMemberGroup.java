package viosmash.dal.dataobject;

import lombok.Data;
import viosmash.enums.GroupRole;

@Data
public class UserMemberGroup {
    private Long userId;
    private Long groupId;

    private GroupRole groupRole;
}
