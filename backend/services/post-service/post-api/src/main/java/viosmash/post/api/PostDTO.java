package viosmash.post.api;

import lombok.Data;
import viosmash.group.api.GroupDTO;
import viosmash.post.enums.PostType;
import viosmash.profile.api.UserDTO;

import java.util.List;

@Data
public class PostDTO {
    private Long id;
    private String content;
    private UserDTO user;
    private PostDTO sharePost;
    private PostType postType;
    private GroupDTO group;
    private List<String> imageUrls;
    private List<String> fileUrls;
    private Integer numberOfShare;
    private Integer numReaction;
    private Integer numComment;
}
