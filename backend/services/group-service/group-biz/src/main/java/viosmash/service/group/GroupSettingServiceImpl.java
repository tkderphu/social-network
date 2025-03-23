package viosmash.service.group;

import org.springframework.stereotype.Service;
import viosmash.aop.GroupPermission;
import viosmash.dal.dataobject.GroupSetting;
import viosmash.enums.GroupRole;

@Service
public class GroupSettingServiceImpl implements GroupSettingService{

    @Override
    @GroupPermission(specificRole = GroupRole.OWNER)
    public Boolean updateEnableAutoAcceptMember(Long postId, Boolean isTrueOrFalse) {
        return null;
    }

    @Override
    @GroupPermission(specificRole = GroupRole.OWNER)
    public Boolean updateEnableAutoReviewPost(Long postId, Boolean isTrueOrFalse) {
        return null;
    }

    @Override
    public GroupSetting getGroupSetting(Long groupId) {
        return null;
    }
}
