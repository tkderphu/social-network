package viosmash.service.notify;

import viosmash.dal.dataobject.NotifySetting;

public interface NotifySettingService {

    /**
     * Someone chat to you
     * @return
     */
    Boolean updateNotifyChatAction(Long userId, Boolean enable);

    /**
     * Someone comment, reply comment to you
     * @return
     */
    Boolean updateNotifyCommentAction(Long userId, Boolean enable);

    /**
     * Someone reaction about your post, comment, message(chatting)
     * @return
     */
    Boolean updateNotifyReactionAction(Long userId, Boolean enable);

    /**
     * 
     */
    Boolean updateNotifyFriendAction(Long userId, Boolean enable);
    
    NotifySetting getSetting(Long userId);


    void deleteNotifyMessage(String notifyMessageId);
}
