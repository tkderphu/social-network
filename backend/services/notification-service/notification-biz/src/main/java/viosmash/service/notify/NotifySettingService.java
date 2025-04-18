package viosmash.service.notify;

import viosmash.dal.dataobject.NotifySetting;

public interface NotifySettingService {

    /**
     * Someone chat to you
     */
    void updateNotifyChatAction(Long userId, Boolean enable);

    /**
     * Someone comment, reply comment to you
     */
    void updateNotifyCommentAction(Long userId, Boolean enable);

    /**
     * Someone reaction about your post, comment, message(chatting)
     */
    void updateNotifyReactionAction(Long userId, Boolean enable);

    /**
     *
     */
    void updateNotifyFriendAction(Long userId, Boolean enable);
    
    NotifySetting getSetting(Long userId);

}
