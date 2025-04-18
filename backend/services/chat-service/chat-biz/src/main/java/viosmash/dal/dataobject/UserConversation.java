package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Entity
@Data
@Accessors(chain = true)
@Table(name = "tblUserConversation")
public class UserConversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long conversationId;

    private Long userId;


    private LocalDateTime joinedAt;

}
