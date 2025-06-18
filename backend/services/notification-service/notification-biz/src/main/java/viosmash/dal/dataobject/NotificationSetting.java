package viosmash.dal.dataobject;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@Entity
@NoArgsConstructor
@Table(name = "tblNotificationSetting")
public class NotificationSetting {

    @Id
    private Long userId;


    private Boolean enableCommentNotification;
    private Boolean enablePostFriendsNotification;
    private Boolean enablePostGroupsNotification;
    private Boolean enableVoteNotification;
    private Boolean enablePushNotification;
    private Boolean enableSoundNotification;
    private Boolean enableFriendsRequestNotification;
    private Boolean enableAcceptRequestNotification;
    private Boolean enableRequestJoinGroupNotification;
    private Boolean enableJoinedGroupNotification;
    public NotificationSetting(Long userId) {
        this.userId = userId;
        this.enableVoteNotification = true;
        this.enablePostFriendsNotification = true;
        this.enablePostGroupsNotification = true;
        this.enableCommentNotification = true;
        this.enableFriendsRequestNotification = true;
        this.enableAcceptRequestNotification = true;
        this.enableSoundNotification = true;
        this.enablePushNotification = true;
        this.enableRequestJoinGroupNotification = true;
        this.enableJoinedGroupNotification = true;
    }
}
