package viosmash.pojo.api.post;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.pojo.api.group.GroupDTO;
import viosmash.pojo.api.profile.UserDTO;

@Data
@Accessors(chain = true)
public class PostSimpleDTO {
    private Long id;
    private String content;
    private GroupDTO group;
    private UserDTO user;
}
