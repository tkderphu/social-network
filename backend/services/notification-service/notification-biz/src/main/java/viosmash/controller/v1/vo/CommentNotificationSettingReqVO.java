package viosmash.controller.v1.vo;

import lombok.Data;
import viosmash.notification.enums.CommentNotificationSettingType;

@Data
public class CommentNotificationSettingReqVO {
    private CommentNotificationSettingType type;
    private Boolean enable;
}
