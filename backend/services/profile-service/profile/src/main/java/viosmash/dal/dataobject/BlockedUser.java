package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tblBlockedUser")
@Accessors(chain = true)
public class BlockedUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long fromUserId;
    private Long toUserId;

    private LocalDateTime blockedAt;

    public BlockedUser() {
        this.blockedAt = LocalDateTime.now();
    }
}
