package viosmash.controller.v1.vo;

import lombok.Data;
import viosmash.notification.enums.PostNotificationSettingType;

@Data
public class PostNotificationSettingReqVO {
    private PostNotificationSettingType type;
    private Boolean enable;
}
