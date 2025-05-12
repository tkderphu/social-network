package viosmash.notification.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum NotificationType {

    ACCEPTED_REQUEST_FRIEND(""),
    CREATED_REQUEST_FRIEND(""),
    CREATED_REACTION(""),
    CREATED_COMMENT(""),
    CREATED_REPLY_COMMENT(""),
    FORGOT_PASSWORD("forgot_password.html"),
    FOLLOW_USER("");

    private final String fileNameHtml;
}
