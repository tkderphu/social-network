package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.enums.Role;

import java.time.LocalDateTime;

@Entity
@Data
@Accessors(chain = true)
@Table(name = "tblUserConversation")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long conversationId;
    private Long userId;
    private Role role;
    private LocalDateTime invitedAt;
    private Long invitedBy;

}
