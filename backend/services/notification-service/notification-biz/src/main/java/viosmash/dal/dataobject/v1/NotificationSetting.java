package viosmash.dal.dataobject.v1;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tblNotificationSetting")
public class NotificationSetting {
    public Boolean enableSound;
    private Boolean enablePushNotification;
    private Boolean enablePostNotificationFromFriends;
    private Boolean enablePostNotificationFromGroups;
    private Boolean enableRequestFriendNotification;
    private Boolean enableAcceptFriendNotification;
    @Id
    private Long userId;
}
