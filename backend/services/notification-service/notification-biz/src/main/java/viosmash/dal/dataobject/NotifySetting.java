package viosmash.dal.dataobject;

import jakarta.persistence.Access;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Table(name = "tblNotifySetting")
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class NotifySetting {
    @Id
    private Long userId;
    private Boolean enableNotifyCommentAction;
    private Boolean enableNotifyFriendAction;
    private Boolean enableNotifyReactionAction;
    private Boolean enableNotifyChatAction;

}
