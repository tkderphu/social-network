package viosmash.dal.dataobject.privacy;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Table(name = "profile_privacy_notification")
@Entity
@Data
@Accessors(chain = true)
public class UserNotification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private NotificationEnum notificationEnum;
    private Long userId;
}
