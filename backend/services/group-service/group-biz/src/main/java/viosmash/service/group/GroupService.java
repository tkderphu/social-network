package viosmash.service.group;

import viosmash.controller.vo.GroupCreateReqVO;
import viosmash.enums.GroupRole;
import viosmash.enums.GroupType;

public interface GroupService {


    Boolean acceptMemberJoinGroup(Long groupId,
                                  Long memberId);

    Boolean acceptPost(Long groupId,
                       Long postId);


    Boolean deleteGroup(Long groupId);

    Long createGroup(String name, GroupType groupType);
    Long updateGroup(String name, GroupType groupType);

}
