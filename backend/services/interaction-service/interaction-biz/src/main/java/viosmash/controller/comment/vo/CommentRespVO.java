package viosmash.controller.comment.vo;

import jakarta.persistence.Access;
import jakarta.persistence.Column;
import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.date.DateUtils;
import viosmash.profile.api.UserDTO;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CommentRespVO {
    private Long id;
    private String content;
    private List<String> mediaUrls;

    private LocalDateTime createdDate;
    private String time;

    private UserDTO user;

    private Long replyCommentId;

    private Long rootCommentId;

    public String getTime() {
        return DateUtils.timeAgo(createdDate);
    }
}
