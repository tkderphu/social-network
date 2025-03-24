package viosmash.dal.dataobject;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.enums.GroupRole;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "user_member_group")
public class UserMemberGroup {
    @Id
    private Long id;

    private Long memberId;
    private Long groupId;

    @Enumerated(EnumType.STRING)
    private GroupRole groupRole;
}
