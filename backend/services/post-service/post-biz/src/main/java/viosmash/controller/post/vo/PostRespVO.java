package viosmash.controller.post.vo;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.group.api.GroupDTO;
import viosmash.interaction.api.dto.PostStats;
import viosmash.post.enums.PostPrivacy;
import viosmash.post.enums.PostType;
import viosmash.profile.api.UserDTO;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Accessors(chain = true)
public class PostRespVO {
    private Long id;
    private String content;
    private UserDTO user;
    private GroupDTO group;
    private List<String> mediaUrls;
    private PostType postType;
    private PostPrivacy postPrivacy;
    private PostRespVO sharePost;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private PostStats postStats;
}
