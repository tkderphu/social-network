package viosmash.controller.vo;

import lombok.Data;
import viosmash.enums.ReactionType;

@Data
public class GroupReactionTypeResp {
    private Emoji emoji;
    private int number;

    public static GroupReactionTypeResp of(ReactionType reactionType,
                                           int number) {
        GroupReactionTypeResp res = new GroupReactionTypeResp();
        res.setEmoji(Emoji.of(reactionType));
        res.setNumber(number);

        return res;
    }
}
