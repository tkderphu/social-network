package viosmash.controller.member.vo;

import lombok.Data;
import viosmash.core.utils.SecurityUtils;

@Data
public class MemberConversationUpdateNotifyReqVO {
    private Long userId = SecurityUtils.getLoginUserMemberId();
    private String conversationId;
    private Boolean enableSoundNotification;
    private Boolean enablePushNotification;
}
