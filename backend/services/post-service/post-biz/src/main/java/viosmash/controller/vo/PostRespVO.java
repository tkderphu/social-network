package viosmash.controller.vo;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.api.GroupDTO;
import viosmash.api.UserDTO;
import viosmash.enums.PostType;

import java.util.List;

@Data
@Accessors(chain = true)
public class PostRespVO {
    private Long id;
    private String content;
    private UserDTO user;
    private PostRespVO sharePost;
    private PostType postType;
    private GroupDTO group;
    private List<String> imageUrls;
    private List<String> fileUrls;
    private Integer numberOfShare;
}
