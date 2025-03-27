package viosmash.controller.vo;

import lombok.Data;

import java.util.List;

@Data
public class Top3ReactionResp {
    /**
     * get top 3 reaction common of entity ...
     */
    private List<Emoji> emojis;
    /**
     * Number of reaction of entity (post, message, comment)
     */
    private int number;
}
