package viosmash.service.group;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.aop.GroupPermission;
import viosmash.controller.vo.GroupCreateReqVO;
import viosmash.dal.dataobject.Group;
import viosmash.dal.repo.GroupRepository;
import viosmash.enums.GroupRole;
import viosmash.enums.GroupType;

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
        return null;
    }

    @Override
    public Long createGroup(GroupCreateReqVO reqVO) {
        Group group = new Group().setGroupType(reqVO.getGroupType())
                .setCreatedAt(LocalDateTime.now())
                .setName(reqVO.getName())
                .setDescription(reqVO.getDescription());
        groupRepository.save(group);
        return group.getId();
    }

    @Override
    @GroupPermission(specificRole = GroupRole.OWNER)
    public Long updateGroup(Long groupId, String name, GroupType groupType) {
        Group group = getGroup(groupId);
        if(name != null && !name.isEmpty()) {
            group.setName(name);
        }
        if(groupType != null) {
            group.setGroupType(groupType);
        }
        this.groupRepository.save(group);
        return group.getId();
    }

    @Override
    public List<Group> getListGroup() {
        return List.of();
    }
}
