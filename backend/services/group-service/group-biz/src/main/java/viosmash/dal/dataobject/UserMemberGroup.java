package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.group.enums.GroupRole;

import java.time.LocalDateTime;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "tblUserMemberGroup")
public class UserMemberGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long memberId;
    private Long groupId;
    private LocalDateTime joined;
    @Enumerated(EnumType.STRING)
    private GroupRole groupRole;
}
