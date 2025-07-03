package viosmash.service.group;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;
import viosmash.aop.GroupPermission;
import viosmash.collection.CollUtils;
import viosmash.controller.group.vo.GroupCreateReqVO;
import viosmash.controller.group.vo.GroupRespVO;
import viosmash.controller.group.vo.GroupUpdateSettingReqVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.Group;
import viosmash.dal.dataobject.UserMemberGroup;
import viosmash.dal.repo.GroupRepository;
import viosmash.dal.repo.UserMemberGroupRepository;
import viosmash.exception.ServiceException;
import viosmash.group.enums.GroupRole;
import viosmash.group.enums.GroupType;
import viosmash.object.BeanUtil;
import viosmash.pojo.PageResult;
import viosmash.string.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import static viosmash.exception.utils.ServiceUtils.exception;

@Service
@Slf4j
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService{
    private final GroupRepository groupRepository;
    private final UserMemberGroupRepository userMemberGroupRepository;
    @Override
    public Group getGroup(Long id) {
        return this.groupRepository.findById(id)
                .orElseThrow(() -> exception(404, "group not found"));
    }

    @Override
    @GroupPermission(specificRole = GroupRole.OWNER)
    public Boolean deleteGroup(Long groupId) {
        this.groupRepository.deleteById(groupId);
        return true;
    }

    @Override
    @Transactional
    public Long createGroup(Long ownerId, GroupCreateReqVO reqVO) {
        Group group = BeanUtil.copy(reqVO, Group.class)
                .setCreatedAt(LocalDateTime.now())
                .setEnableAutoAcceptMember(true)
                .setEnableNotificationWhenUserRequest(true)
                .setEnableAutoReviewPost(true)
                .setOwnerId(ownerId)
                .setEnableNotificationWhenNewPostComing(true);
        groupRepository.save(group);

        Set<Long> userIds = reqVO.getUserIds();
        if(CollectionUtils.isEmpty(reqVO.getUserIds())) {
            userIds.add(ownerId);
        }
        CollUtils.convertList(reqVO.getUserIds(), userId -> {
            this.userMemberGroupRepository.save(new UserMemberGroup()
                    .setGroupRole(userId.equals(ownerId) ? GroupRole.OWNER : GroupRole.MEMBER)
                    .setJoined(LocalDateTime.now())
                    .setGroupId(group.getId())
                    .setIsBanned(false)
                    .setMemberId(userId));
            return null;
        });

        return group.getId();
    }

    @Override
    @GroupPermission(specificRole = GroupRole.OWNER)
    public Long updateGroup(Long groupId, String name, GroupType groupType, String description) {
        Group group = getGroup(groupId);
        if(!StringUtils.isEmpty(description)) {
            group.setName(name);
        }
        if(groupType != null) {
            group.setGroupType(groupType);
        }
        if(!StringUtils.isEmpty(description)) {
            group.setDescription(description);
        }
        this.groupRepository.save(group);
        return group.getId();
    }

    @Override
    public List<GroupRespVO> getListGroupJoined(Long userId) {
        List<Group> groups = this.groupRepository.findAllGroupJoinedByUserId(userId);
        return CollUtils.convertList(groups, group ->  BeanUtil.copy(group, GroupRespVO.class));
    }

    @Override
    public List<Group> getListGroupByOwner(Long ownerId) {
        List<Group> groups = this.groupRepository
                .findAllGroupJoined(ownerId, GroupRole.OWNER);
        return groups;
    }

    @Override
    @Transactional(rollbackFor = ServiceException.class)
    @GroupPermission(specificRole = GroupRole.OWNER)
    public void updateDescription(Long groupId, String description) {
        Group group = this.groupRepository.findById(groupId).get()
                .setDescription(description);
        this.groupRepository.save(group);
    }

    @Override
    @Transactional(rollbackFor = ServiceException.class)
    @GroupPermission(specificRole = GroupRole.OWNER)
    public void updateNotification(Long groupId, Boolean notification) {
        Group group = this.groupRepository.findById(groupId).get()
                .setEnableNotificationWhenUserRequest(notification);
        this.groupRepository.save(group);
    }

    @Override
    public void updateGroupCoverPhoto(Long groupId, String description, MultipartFile file) {
        //
    }

    @Override
    public PageResult<GroupRespVO> search(String keyword, int page, int limit) {
        Page<Group> groupPage = groupRepository.searchByName(
                keyword.toLowerCase(),
                PageRequest.of(page - 1, limit));

        List<GroupRespVO> resp = CollUtils.convertList(groupPage.getContent(), group -> {
            UserMemberGroup memberGroup = userMemberGroupRepository.findByGroupIdAndMemberId(
                    group.getId(),
                    SecurityUtils.getLoginUserMemberId()
            );
            if(memberGroup != null && memberGroup.getIsBanned()) {
                return null;
            }
            return BeanUtil.copy(group, GroupRespVO.class)
                    .setNumberOfMembers(userMemberGroupRepository.countMember(group.getId()));
        }, group -> group != null);
        return new PageResult<>(page, limit, resp, groupPage.getTotalPages());
    }

    @Override
    public void updateGroupSetting(Long groupId, GroupUpdateSettingReqVO req) {
        Group group = this.groupRepository.findById(groupId)
                .orElseThrow(() -> exception(404, "not found group"));
        group.setEnableAutoReviewPost(req.getEnableAutoReviewPost())
                .setEnableAutoAcceptMember(req.getEnableAutoAcceptMember())
                .setEnableNotificationWhenUserRequest(req.getEnableNotificationWhenUserRequest())
                .setEnableNotificationWhenNewPostComing(req.getEnableNotificationWhenNewPostComing());

        this.groupRepository.save(group);
    }

    @Override
    public List<GroupRespVO> suggestGroupToBanUser(Long currentUserId, Long userId, int type) {
        List<Group> groupAgg = groupRepository.suggestGroupToBanUser(currentUserId, userId);
        log.info("common group: {}", groupAgg);
        return CollUtils.convertList(groupAgg, group ->  {
            UserMemberGroup currentUserRole = userMemberGroupRepository.findByGroupIdAndMemberId(group.getId(), currentUserId);
            UserMemberGroup userRole = userMemberGroupRepository.findByGroupIdAndMemberId(group.getId(), userId);
            GroupRespVO resp = BeanUtil.copy(group, GroupRespVO.class);
            if(userRole.getIsBanned()) {
                if(type == 0) return null;
                return resp;
            }
            if(type == 0) {
                if(currentUserRole.getGroupRole() == GroupRole.OWNER ||
                        ( currentUserRole.getGroupRole() == GroupRole.REVIEWER && userRole.getGroupRole() == GroupRole.MEMBER)) {
                    return resp;
                }
            }
            return null;
        });
    }


}
