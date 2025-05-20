package viosmash.service.notify;

import viosmash.controller.vo.setting.NotifySettingUpdateReq;
import viosmash.dal.dataobject.NotifySetting;

public interface NotifySettingService {


    /**
     * Someone chat to you
     */
    void updatePostSetting(Long userId, NotifySetting.Setting setting);

    /**
     * Someone chat to you
     */
    void updateCommentSetting(Long userId, NotifySetting.Setting setting);

    /**
     * Someone comment, reply comment to you
     */
    void updateReactionSetting(Long userId, NotifySetting.Setting setting);

    /**
     * Someone reaction about your post, comment, message(chatting)
     */
    void updateChatSetting(Long userId, NotifySetting.Setting setting);

    /**
     *
     */
    void updateFriendSetting(Long userId, NotifySetting.Setting setting);
    
    NotifySetting getSetting(Long userId);

}
