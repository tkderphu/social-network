package viosmash.controller.vo;

import lombok.Data;

@Data
public class NotificationSettingRespVO {

    private Boolean enableCommentNotification;
    private Boolean enablePostFriendsNotification;
    private Boolean enablePostGroupsNotification;
    private Boolean enableVoteNotification;
    private Boolean enablePushNotification;
    private Boolean enableSoundNotification;
    private Boolean enableFriendsRequestNotification;
    private Boolean enableAcceptRequestNotification;
}
