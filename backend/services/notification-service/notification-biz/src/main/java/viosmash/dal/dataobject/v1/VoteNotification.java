package viosmash.dal.dataobject.v1;

import jakarta.persistence.*;
import lombok.Data;
import viosmash.converter.JsonSetConverter;

import java.util.Set;

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


    @Convert(converter = JsonSetConverter.class)
    private Set<Object> historyUserIds;

    public static enum TypeVote {
        UP,
        DOWN
    }
    public static enum TypeEntity {
        POST,
        COMMENT
    }


}
