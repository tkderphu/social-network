package viosmash.service.member;

import viosmash.dal.dataobject.MemberWaitingReview;
import viosmash.dal.dataobject.UserMemberGroup;
import viosmash.group.enums.GroupRole;

import java.util.List;

public interface UserMemberGroupService {
    UserMemberGroup getMember(Long memberId, Long groupId);
    UserMemberGroup getOwner(Long groupId);
    List<UserMemberGroup> getListReviewer(Long groupId);
    int countMember(Long groupId);

    List<Long> getListMember(Long groupId);
    List<Long> getListGroup(Long memberId);

    Boolean kickMember(Long groupId, Long userMemberId);

    Boolean leaveGroup(Long groupId, Long userMemberId);

    Boolean updatePermissionToUser(Long groupId,
                                   Long memberId,
                                   GroupRole groupRole);

    Boolean acceptMemberJoinGroup(Long groupId,
                                  Long memberId);

    Boolean checkMemberRequestedGroup(Long groupId, Long userId);
    Boolean checkMemberJoinedGroup(Long groupId, Long userId);

    List<MemberWaitingReview> getListRequestAttendGroup(Long groupId);

    Boolean checkUserJoinedGroup(Long userId, Long groupId);

    Boolean cancelMemberJoinGroup(Long groupId, Long userId);

    Boolean requestJoinGroup(Long groupId, Long userId);
}
