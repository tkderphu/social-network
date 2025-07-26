package viosmash.notification.api;

import lombok.Data;

import java.util.Collection;

@Data
public class FirebaseNotificationDto {
    private String topic;
    private String body;
    private Collection<Long> userIds;
}
