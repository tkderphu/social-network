package viosmash.dal.dataobject.v1;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Entity
@Table(name = "tblNotificationMessage")
@Data
@Accessors(chain = true)
public class NotificationMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TargetType targetType;

    private Long targetId;

    @Enumerated(EnumType.STRING)
    private NotificationType notificationType;

    private LocalDateTime createdAt;

    private Long actorId;
    private Long userId;
    private Boolean seen;



    public static enum TargetType {
        POST,COMMENT, USER, VOTE
    }

    public static enum NotificationType {
        NEW_VOTE, NEW_COMMENT, NEW_FRIEND_REQUEST, NEW_ACCEPT_REQUEST, NEW_POST
    }

}
