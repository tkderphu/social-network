package viosmash.controller.vo;

import lombok.Data;
import lombok.experimental.Accessors;
import viosmash.api.UserDTO;
import viosmash.enums.Emoji;

@Data
@Accessors(chain = true)
public class ReactionResp {
    private String id;
    private UserDTO user;
    private Emoji emoji;

}
