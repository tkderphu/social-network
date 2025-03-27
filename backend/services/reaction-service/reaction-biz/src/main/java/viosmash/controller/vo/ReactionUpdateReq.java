package viosmash.controller.vo;

import lombok.Data;
import viosmash.enums.ReactionType;

@Data
public class ReactionUpdateReq {
    private String id;
    private ReactionType reactionType;
}
