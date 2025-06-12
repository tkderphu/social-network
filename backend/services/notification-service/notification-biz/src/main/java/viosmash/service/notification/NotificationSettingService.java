package viosmash.service.notification;

import viosmash.controller.v1.vo.CommentNotificationSettingReqVO;
import viosmash.controller.v1.vo.PostNotificationSettingReqVO;
import viosmash.controller.v1.vo.VoteNotificationSettingReqVO;
import viosmash.dal.dataobject.v1.NotificationSetting;
import viosmash.notification.enums.CommentNotificationSettingType;
import viosmash.notification.enums.VoteNotificationSettingType;

import java.util.Map;

public interface NotificationSettingService {
    void updatePushNotification(Long userId, Boolean enablePushNotification);
    void updateSoundNotification(Long userId, Boolean enableSoundNotification);
    void updatePostNotification(Long userId, PostNotificationSettingReqVO req);
    void updateCommentNotification(Long userId, CommentNotificationSettingReqVO req);
    void updateVoteNotification(Long userId, VoteNotificationSettingReqVO req);


    NotificationSetting getNotificationSetting(Long userId);
}
