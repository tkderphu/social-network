package viosmash.controller.v1.vo;

import lombok.Data;
import viosmash.date.DateUtils;
import viosmash.pojo.api.profile.UserDTO;

import java.time.LocalDateTime;

@Data
public class NotificationRespVO {
    private Long id;
    private UserDTO fromUser;
    private UserDTO toUser;
    private LocalDateTime createdAt;
    private int repeated;
    private Boolean isRead;
    private String timeAgo;

    public String getTimeAgo() {
        return DateUtils.timeAgo(createdAt);
    }
}
