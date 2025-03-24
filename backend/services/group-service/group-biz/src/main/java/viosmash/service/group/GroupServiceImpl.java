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

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService{
    private final GroupRepository groupRepository;
    @Override
    @GroupPermission
    public Boolean acceptMemberJoinGroup(Long groupId, Long memberId) {
        return null;
    }

    @Override
    @GroupPermission
    public Boolean acceptPost(Long groupId, Long postId) {
        return null;
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
    public Long updateGroup(String name, GroupType groupType) {
        return 0L;
    }

    @Override
    public List<Group> getListGroup() {
        return List.of();
    }
}
