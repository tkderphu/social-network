package viosmash.controller.vo.message;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.date.DateUtils;
import viosmash.notification.enums.NotificationType;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Accessors(chain = true)
public class NotifyMessageRespVO {
    private Long id;
    private LocalDateTime createdAt;
    private String time;
    private Boolean read;
    private Params params;
    private NotificationType type;

    public String getTime() {
        return DateUtils.timeAgo(createdAt);
    }


    @Data
    @Accessors(chain = true)
    public static class Params {
        private Long userId;
        private String userFullName;
        private String userAvatar;
        private String groupId;
        private String groupName;
        private String postId;
        private String postAuthorId;
        private String postAuthorAvatar;
        private String postAuthorFullName;
    }
}
