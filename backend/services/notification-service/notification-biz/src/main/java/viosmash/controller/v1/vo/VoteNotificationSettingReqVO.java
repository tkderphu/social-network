package viosmash.controller.v1.vo;

import lombok.Data;
import viosmash.notification.enums.VoteNotificationSettingType;

@Data
public class VoteNotificationSettingReqVO {
    private VoteNotificationSettingType type;
    private Boolean enable;
}
