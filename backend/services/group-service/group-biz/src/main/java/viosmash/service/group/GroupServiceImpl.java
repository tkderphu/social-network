package viosmash.service.group;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.aop.GroupPermission;
import viosmash.controller.group.vo.GroupCreateReqVO;
import viosmash.dal.dataobject.Group;
import viosmash.dal.repo.GroupRepository;
import viosmash.enums.GroupRole;
import viosmash.enums.GroupType;
import viosmash.string.StringUtils;

import java.time.LocalDateTime;
import java.util.List;

import static viosmash.exception.utils.ServiceUtils.exception;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService{
    private final GroupRepository groupRepository;


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
    public Long createGroup(Long ownerId, GroupCreateReqVO reqVO) {
        Group group = new Group().setGroupType(reqVO.getGroupType())
                .setCreatedAt(LocalDateTime.now())
                .setOwnerId(ownerId)
                .setEnableAutoAcceptMember(true)
                .setEnableAutoReviewPost(true)
                .setName(reqVO.getName())
                .setDescription(reqVO.getDescription());
        groupRepository.save(group);
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

}
