package viosmash.dal.dataobject.v1;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@DiscriminatorValue("FRIEND")
@Table(name = "tblFriendNotification")
public class FriendNotification extends Notification{
    @Enumerated(EnumType.STRING)
    private FriendTypeAction friendTypeAction;
    public static enum FriendTypeAction {
        ACCEPT, REQUEST
    }
}
