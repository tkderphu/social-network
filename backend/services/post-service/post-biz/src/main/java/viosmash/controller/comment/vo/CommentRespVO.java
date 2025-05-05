package viosmash.controller.comment.vo;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.profile.api.UserDTO;

import java.util.List;

@Data
@Accessors(chain = true)
public class CommentRespVO {
    private Long id;
    private String content;
    private List<String> mediaUrls;
    private String timeAgo;
    private UserDTO user;
    private UserDTO replyUser;
    private Long rootCommentId;
    private int numReaction;
    private int numNestedComment;

}
