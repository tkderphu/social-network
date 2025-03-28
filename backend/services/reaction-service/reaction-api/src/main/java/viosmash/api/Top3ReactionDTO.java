package viosmash.api;

import lombok.Data;
import viosmash.enums.Emoji;

import java.util.List;

@Data
public class Top3ReactionDTO {
    private List<Emoji> emojis;
    /**
     * Number of reaction of entity (post, message, comment)
     */
    private int number;
}
