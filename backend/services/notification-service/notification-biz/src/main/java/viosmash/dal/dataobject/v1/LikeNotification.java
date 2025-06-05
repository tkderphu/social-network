package viosmash.dal.dataobject.v1;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@DiscriminatorValue("LIKE")
@Table(name = "tblLikeNotification")
public class LikeNotification extends Notification{

    @Enumerated(EnumType.STRING)
    private LikeType type;
    private Long typeId;

    public static enum LikeType {
        COMMENT, POST
    }
}
