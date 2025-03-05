package viosmash.service.privacy;

import viosmash.controller.privacy.vo.PrivacyRespVO;
import viosmash.dal.dataobject.privacy.*;

public interface UserPrivacyService {
    void updateMessagePrivacy(Long userId, MessageEnum messageEnum);
    void updatePostPrivacy(Long userId, PostEnum postEnum);
    void updateNotificationPrivacy(Long userId, NotificationEnum notificationEnum);


    UserMessage getUserMessage(Long userId);
    UserPost getUserPost(Long userId);
    UserNotification getUserNotification(Long userId);

    PrivacyRespVO getPrivacy(Long userId);

}
