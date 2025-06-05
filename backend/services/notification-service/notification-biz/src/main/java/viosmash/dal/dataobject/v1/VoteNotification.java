package viosmash.dal.dataobject.v1;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name = "tblVoteNotification")
@DiscriminatorValue("VOTE")
@Entity
public class VoteNotification extends Notification{
    @Enumerated(EnumType.STRING)
    private TypeVote typeVote;

    private Long typeEntityId;

    @Enumerated(EnumType.STRING)
    private TypeEntity typeEntity;
    public static enum TypeVote {
        UP,
        DOWN
    }
    public static enum TypeEntity {
        POST,
        COMMENT
    }
}
