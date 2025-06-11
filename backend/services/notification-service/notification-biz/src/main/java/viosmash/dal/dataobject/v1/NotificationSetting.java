package viosmash.dal.dataobject.v1;

import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import viosmash.converter.JsonObjectConverter;
import viosmash.notification.enums.CommentNotificationSettingType;
import viosmash.notification.enums.PostNotificationSettingType;
import viosmash.notification.enums.VoteNotificationSettingType;

import java.util.HashMap;
import java.util.Map;

import static viosmash.notification.enums.CommentNotificationSettingType.NEW_COMMENT;
import static viosmash.notification.enums.CommentNotificationSettingType.REPLY_COMMENT;
import static viosmash.notification.enums.PostNotificationSettingType.NEW_POST_FROM_FRIENDS;
import static viosmash.notification.enums.PostNotificationSettingType.NEW_POST_FROM_GROUPS;
import static viosmash.notification.enums.VoteNotificationSettingType.VOTE_DOWN;

@Data
@Accessors(chain = true)
@Entity
@NoArgsConstructor
@Table(name = "tblNotificationSetting")
public class NotificationSetting {

    @Id
    private Long userId;


    @Convert(converter = JsonObjectConverter.class)
    private Map<PostNotificationSettingType, Boolean> postSetting;

    @Convert(converter = JsonObjectConverter.class)
    private Map<CommentNotificationSettingType, Boolean> commentSetting;

    @Convert(converter = JsonObjectConverter.class)
    private Map<VoteNotificationSettingType, Boolean> voteSetting;

    private Boolean enablePushNotification;
    private Boolean enableSoundNotification;


    public NotificationSetting(Long userId) {
        this.userId = userId;
        postSetting = new HashMap<>();
        postSetting.put(NEW_POST_FROM_FRIENDS, true);
        postSetting.put(NEW_POST_FROM_GROUPS, true);

        commentSetting = new HashMap<>();
        commentSetting.put(NEW_COMMENT, true);
        commentSetting.put(REPLY_COMMENT, true);

        voteSetting = new HashMap<>();
        voteSetting.put(VOTE_DOWN, true);
        voteSetting.put(VOTE_DOWN, true);

        enableSoundNotification = true;
        enablePushNotification = true;
    }
}
