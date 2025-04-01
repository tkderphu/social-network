package viosmash.dal.dataobject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "NotifySetting")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotifySetting {
    @Id
    private Long userId;
    private Boolean enableNotifyCommentAction;
    private Boolean enableNotifyFriendAction;
    private Boolean enableNotifyReactionAction;
    private Boolean enableNotifyChatAction;
}
