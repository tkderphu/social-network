package viosmash.service.member;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import viosmash.aop.GroupPermission;
import viosmash.collection.CollUtils;
import viosmash.controller.member.vo.UserMemberGroupResp;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.Group;
import viosmash.dal.dataobject.MemberWaitingReview;
import viosmash.dal.dataobject.UserMemberGroup;
import viosmash.dal.repo.GroupRepository;
import viosmash.dal.repo.MemberWaitingReviewRepository;
import viosmash.dal.repo.UserMemberGroupRepository;
import viosmash.group.enums.GroupRole;
import viosmash.notification.api.NotificationApi;
import viosmash.notification.api.NotificationDto;
import viosmash.notification.enums.NotificationType;
import viosmash.notification.enums.TargetType;
import viosmash.object.BeanUtil;
import viosmash.pojo.PageResult;
import viosmash.profile.api.UserApi;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import static viosmash.exception.utils.ServiceUtils.exception;

@RequiredArgsConstructor
@Service
public class UserMemberGroupServiceImpl implements UserMemberGroupService{
    private final UserMemberGroupRepository userMemberGroupRepository;
    private final MemberWaitingReviewRepository memberWaitingReviewRepository;
    private final GroupRepository groupRepository;
    private final NotificationApi notificationApi;
    private final UserApi userApi;

    @Override
    public UserMemberGroup getMember(Long memberId, Long groupId) {
        return userMemberGroupRepository.findByGroupIdAndMemberId(groupId, memberId);
    }

    @Override
    public UserMemberGroup getOwner(Long groupId) {
        return userMemberGroupRepository.findByGroupIdAndGroupRole(
                groupId, GroupRole.OWNER
        ).orElseThrow(() -> exception(404, "not found group or not found owner group"));
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
    public PageResult<UserMemberGroupResp> getListMember(Long groupId, int page, int limit) {
        Page<UserMemberGroup> userMemberGroups = userMemberGroupRepository.getAllMember(
                groupId,
                PageRequest.of(page - 1, limit)
        );
        List<UserMemberGroupResp> resp = CollUtils.convertList(userMemberGroups.getContent(), userMemberGroup -> {
            UserMemberGroupResp copy = BeanUtil.copy(userMemberGroup, UserMemberGroupResp.class);
            copy.setUser(userApi.getUserById(userMemberGroup.getMemberId()));
            return copy;
        });

        return new PageResult<>(page, limit, resp, userMemberGroups.getTotalPages());
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
    @Transactional
    public Boolean leaveGroup(Long groupId, Long userMemberId) {
        userMemberGroupRepository.deleteByGroupIdAndMemberId(groupId, userMemberId);
        return true;
    }

    @Override
    @GroupPermission(specificRole = GroupRole.OWNER)
    @Transactional
    public Boolean updatePermissionToUser(Long groupId,
                                          Long memberId,
                                          GroupRole groupRole) {
        userMemberGroupRepository.updateRoleMember(groupId, memberId, groupRole);
        if(groupRole == GroupRole.OWNER) {
            groupRepository.updateOwnerId(groupId, memberId);
            userMemberGroupRepository.updateRoleMember(groupId, SecurityUtils.getLoginUserMemberId(), GroupRole.MEMBER);
        }
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
    public Boolean checkMemberRequestedGroup(Long groupId, Long userId) {
        return null;
    }



    @GroupPermission
    @Override
    public List<MemberWaitingReview> getListRequestAttendGroup(Long groupId) {
        return this.memberWaitingReviewRepository.findAllByGroupId(groupId);
    }

    @Override
    public Boolean inviteUserToGroup(Long groupId, Collection<Long> userIds) {
        List<UserMemberGroup> memberGroups = CollUtils.convertList(userIds, userId -> {
            Boolean check = checkUserJoinedGroup(userId, groupId);
            if(check) {
                return null;
            }
            return new UserMemberGroup().setGroupId(groupId)
                    .setGroupRole(GroupRole.MEMBER)
                    .setJoined(LocalDateTime.now())
                    .setMemberId(userId);
        }, s -> s != null);

        this.userMemberGroupRepository.saveAll(memberGroups);

        CollUtils.convertList(memberGroups, memberGroup -> {
            NotificationDto notificationDto = new NotificationDto()
                    .setTargetId(memberGroup.getGroupId())
                    .setCreatedAt(LocalDateTime.now())
                    .setActorId(SecurityUtils.getLoginUserMemberId())
                    .setNotificationType(NotificationType.JOIN_GROUP_BY_INVITED)
                    .setTargetType(TargetType.GROUP)
                    .setUserId(memberGroup.getMemberId());
            this.notificationApi.sendAppNotification(notificationDto);
            return null;
        });

        return true;
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
                    .setRequestedDate(LocalDateTime.now());
            this.memberWaitingReviewRepository.save(memberWaitingReview);
        }
        return true;
    }



}
