package viosmash.controller.reaction.vo;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.profile.api.UserDTO;

@Data
@Accessors(chain = true)
public class ReactionRespVO {
    private Long id;
    private UserDTO user;
    private String timeAgo;
}
