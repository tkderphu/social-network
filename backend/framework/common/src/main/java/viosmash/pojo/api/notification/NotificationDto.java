package viosmash.pojo.api.notification;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.Map;

@Data
@Accessors(chain = true)
public class NotificationDto {
    private NotificationType type;
    private Map<KeyParams, Object> properties;



    public static enum KeyParams {
        POST_ID, TO_USER_ID, FROM_USER_ID,
        COMMENT_ID, CONTENT, FRIEND_REQUEST, FRIEND_ACCEPT,
        EMAIL, REPLY_COMMENT_ID
    }

    public <T> T getValueFromProperties(KeyParams keyParams) {
        return (T) properties.get(keyParams);
    }

}
