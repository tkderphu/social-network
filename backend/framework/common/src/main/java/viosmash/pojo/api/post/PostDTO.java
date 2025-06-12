package viosmash.pojo.api.post;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.pojo.api.group.GroupDTO;
import viosmash.pojo.api.profile.UserDTO;

import java.util.List;

@Data
@Accessors(chain = true)
public class PostDTO extends PostSimpleDTO{
    private PostDTO sharePost;
    private String postType;
    private List<String> imageUrls;
    private List<String> fileUrls;
    private Integer numberOfShare;
    private Integer numReaction;
    private Integer numComment;
    private Long createdDate;
}
