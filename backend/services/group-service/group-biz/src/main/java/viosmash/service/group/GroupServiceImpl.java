package viosmash.service.group;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import viosmash.aop.GroupPermission;
import viosmash.collection.CollUtils;
import viosmash.controller.group.vo.GroupCreateReqVO;
import viosmash.dal.dataobject.Group;
import viosmash.dal.dataobject.UserMemberGroup;
import viosmash.dal.repo.GroupRepository;
import viosmash.dal.repo.UserMemberGroupRepository;
import viosmash.exception.ServiceException;
import viosmash.group.enums.GroupRole;
import viosmash.group.enums.GroupType;
import viosmash.string.StringUtils;

import java.time.LocalDateTime;
import java.util.List;

import static viosmash.exception.utils.ServiceUtils.exception;

@Service
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
        Group group = new Group().setGroupType(reqVO.getGroupType())
                .setCreatedAt(LocalDateTime.now())
                .setOwnerId(ownerId)
                .setEnableAutoAcceptMember(true)
                .setEnableNotificationWhenUserRequest(true)
                .setEnableAutoReviewPost(true)
                .setName(reqVO.getName());
        groupRepository.save(group);
        if(!CollectionUtils.isEmpty(reqVO.getUserIds())) {
            CollUtils.convertList(reqVO.getUserIds(), userId -> {
                this.userMemberGroupRepository.save(new UserMemberGroup()
                        .setGroupRole(userId.equals(ownerId) ? GroupRole.OWNER : GroupRole.MEMBER)
                        .setJoined(LocalDateTime.now())
                        .setGroupId(group.getId())
                        .setMemberId(userId));
                return null;
            });
        }
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
    public List<Group> getListGroupByOwner(Long ownerId) {
        return this.groupRepository.findAllByOwnerId(ownerId);
    }

    @Override
    @Transactional(rollbackFor = ServiceException.class)
    public void updateDescription(Long groupId, String description) {
        Group group = this.groupRepository.findById(groupId).get().setDescription(description);
        this.groupRepository.save(group);
    }

    @Override
    @Transactional(rollbackFor = ServiceException.class)
    public void updateNotification(Long groupId, Boolean notification) {
        Group group = this.groupRepository.findById(groupId).get()
                .setEnableNotificationWhenUserRequest(notification);
        this.groupRepository.save(group);
    }


}
