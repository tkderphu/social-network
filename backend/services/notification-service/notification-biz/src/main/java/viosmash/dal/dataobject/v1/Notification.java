package viosmash.dal.dataobject.v1;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tblNotification")
@DiscriminatorColumn(name = "typeInstance")
@Inheritance(strategy = InheritanceType.JOINED)
public  class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long fromUserId;
    private Long toUserId;
    private LocalDateTime createdAt;
    private int repeated;
    private Boolean isRead;
}
