package viosmash.service.member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import viosmash.aop.GroupPermission;
import viosmash.dal.dataobject.Group;
import viosmash.dal.dataobject.MemberWaitingReview;
import viosmash.dal.dataobject.UserMemberGroup;
import viosmash.dal.repo.GroupRepository;
import viosmash.dal.repo.MemberWaitingReviewRepository;
import viosmash.dal.repo.UserMemberGroupRepository;
import viosmash.group.enums.GroupRole;

import java.time.LocalDateTime;
import java.util.List;

import static viosmash.exception.utils.ServiceUtils.exception;

@RequiredArgsConstructor
@Service
public class UserMemberGroupServiceImpl implements UserMemberGroupService{
    private final UserMemberGroupRepository userMemberGroupRepository;
    private final MemberWaitingReviewRepository memberWaitingReviewRepository;
    private final GroupRepository groupRepository;

    @Override
    public UserMemberGroup getMember(Long memberId, Long groupId) {
        return userMemberGroupRepository.findByGroupIdAndMemberId(groupId, memberId);
    }

    @Override
    public List<UserMemberGroup> getListReviewer(Long groupId) {
        return userMemberGroupRepository.getAllMember(groupId, GroupRole.MEMBER);
    }

    @Override
    public int countMember(Long groupId) {
        return userMemberGroupRepository.countMember(groupId);
    }



    @Override
    public List<Long> getListMember(Long groupId) {
        return userMemberGroupRepository.getAllMember(groupId);
    }

    @Override
    public List<Long> getListGroup(Long memberId) {
        return userMemberGroupRepository.getAllGroup(memberId);
    }

    @Override
    @GroupPermission
    @Transactional
    public Boolean kickMember(Long groupId, Long userMemberId) {
        userMemberGroupRepository.deleteByGroupIdAndMemberId(groupId, userMemberId);
        return true;
    }

    @Override
    public Boolean leaveGroup(Long groupId, Long userMemberId) {
        userMemberGroupRepository.deleteByGroupIdAndMemberId(groupId, userMemberId);
        return true;
    }

    @Override
    @GroupPermission(specificRole = GroupRole.OWNER)
    public Boolean updatePermissionToUser(Long groupId,
                                          Long memberId,
                                          GroupRole groupRole) {
        userMemberGroupRepository.updateRoleMember(groupId, memberId, groupRole);
        return true;
    }

    @Override
    @GroupPermission
    @Transactional
    public Boolean acceptMemberJoinGroup(Long groupId, Long memberId) {
        userMemberGroupRepository.save(new UserMemberGroup()
                .setGroupId(groupId).setMemberId(memberId).setGroupRole(GroupRole.MEMBER));
        memberWaitingReviewRepository.deleteAllByUserIdAndGroupId(memberId, groupId);
        return true;
    }

    @Override
    public void requestJoinGroup(Long groupId) {

    }

    @Override
    public Boolean checkMemberRequestedGroup(Long groupId, Long userId) {
        return null;
    }

    @Override
    public Boolean checkMemberJoinedGroup(Long groupId, Long userId) {
        return null;
    }

    @GroupPermission
    @Override
    public List<MemberWaitingReview> getListRequestAttendGroup(Long groupId) {
        return this.memberWaitingReviewRepository.findAllByGroupId(groupId);
    }

    @Override
    public Boolean checkUserJoinedGroup(Long userId, Long groupId) {
        return this.userMemberGroupRepository.findByGroupIdAndMemberId(groupId, userId) != null;
    }

    @Override
    @GroupPermission
    public Boolean cancelMemberJoinGroup(Long groupId, Long userId) {
        this.memberWaitingReviewRepository.deleteAllByUserIdAndGroupId(userId, groupId);
        return true;
    }

    @Override
    public Boolean requestJoinGroup(Long groupId, Long userId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> exception(404, "not found group with id: " + groupId));
        if(group.getEnableAutoAcceptMember()) {
            UserMemberGroup userMemberGroup = new UserMemberGroup()
                    .setGroupId(groupId).setMemberId(userId)
                    .setJoined(LocalDateTime.now())
                    .setGroupRole(GroupRole.MEMBER);
            this.userMemberGroupRepository.save(userMemberGroup);
        } else {
            MemberWaitingReview memberWaitingReview = new MemberWaitingReview()
                    .setGroupId(groupId).setUserId(userId)
                    .setRequestDate(LocalDateTime.now());
            this.memberWaitingReviewRepository.save(memberWaitingReview);
        }
        return true;
    }
}
