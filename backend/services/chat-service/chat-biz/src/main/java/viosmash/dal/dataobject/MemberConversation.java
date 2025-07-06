package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.chat.enums.Role;

import java.time.LocalDateTime;


@Entity
@Table(name = "tblMemberConversation")
@Data
@Accessors(chain = true)
public class MemberConversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long memberId;
    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

    @Enumerated(EnumType.STRING)
    private Role role;
    private Long invitedByMemberId;
    private LocalDateTime invitedAt;

    private Boolean enableSoundNotification;
    private Boolean enablePushNotification;
}
