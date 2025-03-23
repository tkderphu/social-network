package viosmash.service.group;

import viosmash.dal.dataobject.GroupSetting;

public interface GroupSettingService {
    Boolean updateEnableAutoAcceptMember(Long postId, Boolean isTrueOrFalse);
    Boolean updateEnableAutoReviewPost(Long postId, Boolean isTrueOrFalse);

    GroupSetting getGroupSetting(Long groupId);


}
