package viosmash.service.member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.aop.GroupPermission;
import viosmash.dal.dataobject.UserMemberGroup;
import viosmash.dal.repo.UserMemberGroupRepository;
import viosmash.enums.GroupRole;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserMemberGroupServiceImpl implements UserMemberGroupService{
    private final UserMemberGroupRepository userMemberGroupRepository;

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
    public Boolean kickMember(Long groupId, Long userMemberId) {
        userMemberGroupRepository.deleteByGroupIdAndUserMemberId(groupId, userMemberId);
        return true;
    }

    @Override
    public Boolean leaveGroup(Long groupId, Long userMemberId) {
        userMemberGroupRepository.deleteByGroupIdAndUserMemberId(groupId, userMemberId);
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
}
