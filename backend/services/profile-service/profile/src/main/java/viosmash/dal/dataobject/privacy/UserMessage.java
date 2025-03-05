package viosmash.dal.dataobject.privacy;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Table(name = "profile_privacy_message")
@Entity
@Data
@Accessors(chain = true)
public class UserMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private MessageEnum messageEnum;

    @Column(unique = true)
    private Long userId;
}
