package viosmash.controller.comment.vo;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.date.DateUtils;
import viosmash.pojo.api.profile.UserDTO;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Accessors(chain = true)
public class CommentRespVO {
    private Long id;
    private String content;
    private List<String> mediaUrls;

    private LocalDateTime createdDate;
    private String time;

    private UserDTO user;

    private Long replyCommentId;

    private Long rootCommentId;

    private Long nestedComments;

    private Long postId;
    private int downVote;
    private int upVote;

    public String getTime() {
        return DateUtils.timeAgo(createdDate);
    }
}
