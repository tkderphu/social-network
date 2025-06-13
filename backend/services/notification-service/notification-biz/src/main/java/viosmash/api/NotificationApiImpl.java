package viosmash.api;


import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.controller.vo.NotificationMessageRespVO;
import viosmash.dal.dataobject.NotificationMessage;
import viosmash.dal.dataobject.NotificationSetting;
import viosmash.notification.api.MailNotificationDto;
import viosmash.notification.api.NotificationApi;
import viosmash.notification.api.NotificationDto;
import viosmash.object.BeanUtil;
import viosmash.service.notification.NotificationService;
import viosmash.service.notification.NotificationSettingService;

@RestController
@RequestMapping(NotificationApi.PREFIX)
@RequiredArgsConstructor
public class NotificationApiImpl implements NotificationApi {
    private final NotificationService notificationService;
    private final NotificationSettingService notificationSettingService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    @Override
    public void sendAppNotification(NotificationDto req) {
        NotificationMessage message = BeanUtil.copy(req, NotificationMessage.class)
                .setSeen(false);
        NotificationSetting notificationSetting = this.notificationSettingService.getNotificationSetting(message.getUserId());
        switch (req.getNotificationType()) {
            case NEW_VOTE -> {
                if(notificationSetting.getEnableVoteNotification()) {
                    saveAndSend(message);
                }
            }
            case NEW_COMMENT -> {
                if(notificationSetting.getEnableCommentNotification()) {
                    saveAndSend(message);
                }
            }
            case NEW_FRIEND_REQUEST -> {
                if(notificationSetting.getEnableFriendsRequestNotification()) {
                    saveAndSend(message);
                }
            }
            case NEW_ACCEPT_REQUEST -> {
                if(notificationSetting.getEnableAcceptRequestNotification()) {
                    saveAndSend(message);
                }
            }
            case NEW_POST_FRIENDS -> {
                if(notificationSetting.getEnablePostFriendsNotification()) {
                    saveAndSend(message);
                }
            }
            case NEW_POST_GROUPS -> {
                if(notificationSetting.getEnablePostGroupsNotification()) {
                    saveAndSend(message);
                }
            }
        }
    }

    private void saveAndSend(NotificationMessage message) {
        NotificationMessageRespVO resp = notificationService.saveNotification(message);
        simpMessagingTemplate.convertAndSend(
                String.format("/topic/notifications/user/%d", message.getUserId()),
                resp
        );
    }

    @Override
    public void sendMail(MailNotificationDto req) {

    }
}
