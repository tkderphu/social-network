package viosmash.service.group;

import viosmash.dal.dataobject.GroupSetting;

public interface GroupSettingService {

    Boolean updateSetting(Long groupId,
                          Boolean enableAutoAcceptMember,
                          Boolean enableAutoReviewPost);

    GroupSetting getGroupSetting(Long groupId);

    GroupSetting createGroupSetting(Long groupId);
}
