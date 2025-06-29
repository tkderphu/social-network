package viosmash.interaction.api.comment;

import lombok.Data;
import viosmash.pojo.api.post.PostDTO;

@Data
public class CommentDTO {
    private Long id;
    private CommentDTO replyComment;
    private PostDTO post;
}
