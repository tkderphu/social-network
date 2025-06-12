package viosmash.interaction.api.comment;

import lombok.Data;
import viosmash.pojo.api.post.PostSimpleDTO;

@Data
public class CommentDTO {
    private Long id;
    private CommentDTO replyComment;
    private PostSimpleDTO post;
}
