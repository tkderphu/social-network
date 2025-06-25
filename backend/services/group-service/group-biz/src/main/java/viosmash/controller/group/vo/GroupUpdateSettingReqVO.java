package viosmash.controller.group.vo;

import lombok.Data;

@Data
public class GroupUpdateSettingReqVO {
    private Boolean enableAutoAcceptMember;
    private Boolean enableAutoReviewPost;
    private Boolean enableNotificationWhenUserRequest;
    private Boolean enableNotificationWhenNewPostComing;
}
