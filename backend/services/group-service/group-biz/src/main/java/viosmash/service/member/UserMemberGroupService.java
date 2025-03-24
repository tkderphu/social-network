package viosmash.service.member;

import viosmash.dal.dataobject.UserMemberGroup;
import viosmash.enums.GroupRole;

import java.util.List;

public interface UserMemberGroupService {
    UserMemberGroup getMember(Long memberId, Long groupId);

    List<UserMemberGroup> getListReviewer(Long groupId);
    int countMember(Long groupId);

    List<Long> getListMember(Long groupId);
    List<Long> getListGroup(Long memberId);

    Boolean kickMember(Long groupId, Long userMemberId);

    Boolean leaveGroup(Long groupId, Long userMemberId);

    Boolean updatePermissionToUser(Long groupId,
                                   Long memberId,
                                   GroupRole groupRole);
}
