package viosmash.enums;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Emoji {
    private String name;
    private String symbol;


    public static Emoji of(ReactionType reactionType) {
        return new Emoji(reactionType.name(), reactionType.getEmoji());
    }


}
