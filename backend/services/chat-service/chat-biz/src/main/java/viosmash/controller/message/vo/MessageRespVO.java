package viosmash.controller.message.vo;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.date.DateUtils;
import viosmash.pojo.api.profile.UserDTO;

import java.time.LocalDateTime;
import java.util.List;
@Data
@Accessors(chain = true)
public class MessageRespVO {
    private Long id;

    private UserDTO sender;
    private String conversationId;
    private String message;

    private List<String> images;

    private List<String> files;

    private LocalDateTime createdAt;
    private String timeAgo;

    public String getTimeAgo() {
        return DateUtils.timeAgo(createdAt);
    }
}
