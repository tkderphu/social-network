package viosmash.service.group;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import viosmash.aop.GroupPermission;
import viosmash.dal.dataobject.GroupSetting;
import viosmash.dal.repo.GroupSettingRepository;
import viosmash.enums.GroupRole;

@Service
@RequiredArgsConstructor
public class GroupSettingServiceImpl implements GroupSettingService{

    private final GroupSettingRepository groupSettingRepository;


    @Override
    @GroupPermission(specificRole = GroupRole.OWNER)
    public Boolean updateSetting(Long groupId,
                                 Boolean enableAutoAcceptMember,
                                 Boolean enableAutoReviewPost) {
        groupSettingRepository.updateSetting(
                groupId,
                enableAutoAcceptMember,
                enableAutoReviewPost);
        return true;
    }

    @Override
    @GroupPermission(specificRole = GroupRole.OWNER)
    public GroupSetting getGroupSetting(Long groupId) {
        return groupSettingRepository.findByGroupId(groupId);
    }

    @Override
    public GroupSetting createGroupSetting(Long groupId) {
        GroupSetting setting = new GroupSetting()
                .setGroupId(groupId)
                .setEnableAutoAcceptMember(true)
                .setEnableAutoReviewPost(true);
        return setting;
    }
}
