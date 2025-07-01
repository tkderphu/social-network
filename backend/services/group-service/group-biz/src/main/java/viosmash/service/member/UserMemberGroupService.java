package viosmash.service.member;

import org.springframework.transaction.annotation.Transactional;
import viosmash.collection.CollUtils;
import viosmash.controller.member.vo.UpdateBanUserReqVO;
import viosmash.controller.member.vo.MemberWaitingReviewRespVO;
import viosmash.controller.member.vo.UserMemberGroupResp;
import viosmash.dal.dataobject.UserMemberGroup;
import viosmash.group.enums.GroupRole;
import viosmash.group.enums.UserGroupStatus;
import viosmash.pojo.PageResult;

import java.util.Collection;
import java.util.List;

public interface UserMemberGroupService {
    UserMemberGroup getMember(Long memberId, Long groupId);
    UserMemberGroup getOwner(Long groupId);
    List<UserMemberGroup> getListReviewer(Long groupId);
    int countMember(Long groupId);

    PageResult<UserMemberGroupResp> getListMember(Long groupId, int page, int limit);

    Boolean kickMember(Long groupId, Long userMemberId);

    Boolean leaveGroup(Long groupId, Long userMemberId);

    Boolean updatePermissionToUser(Long groupId,
                                   Long memberId,
                                   GroupRole groupRole);

    Boolean acceptMemberJoinGroup(Long groupId,
                                  Long memberId);

    Boolean checkMemberRequestedGroup(Long groupId, Long userId);

    List<MemberWaitingReviewRespVO> getListRequestAttendGroup(Long groupId, int page, int limit);

    Boolean inviteUserToGroup(Long groupId, Collection<Long> userIds);

    UserGroupStatus checkUserJoinedGroup(Long userId, Long groupId, boolean forced);

    Boolean cancelMemberJoinGroup(Long groupId, Long userId);


    Boolean banUser(Long groupId, UpdateBanUserReqVO banReq);

    @Transactional
    default void banUser(Collection<Long> groupIds, UpdateBanUserReqVO banReq) {
        CollUtils.convertList(groupIds, groupId -> {
            banUser(groupId, banReq);
            return null;
        });
    };

    Boolean requestJoinGroup(Long groupId, Long userId);

    List<UserMemberGroupResp> getListMemberIsBanned(Long groupId);
}
