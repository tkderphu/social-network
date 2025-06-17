package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.group.enums.GroupType;

import java.time.LocalDateTime;

@Entity
@Table(name = "tblGroup")
@Data
@Accessors(chain = true)
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    @Enumerated(EnumType.STRING)
    private GroupType groupType;
    private LocalDateTime createdAt;
    private Long ownerId;
    private Boolean enableAutoAcceptMember;
    private Boolean enableAutoReviewPost;
    private Boolean enableNotificationWhenUserRequest;
    private Boolean enableNotificationWhenNewPostComing;
    private String coverPhoto;
}
