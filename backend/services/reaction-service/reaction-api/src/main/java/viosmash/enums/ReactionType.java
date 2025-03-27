package viosmash.enums;


import java.util.Arrays;
import java.util.List;

public enum ReactionType {
    LIKE( "👍"),
    LOVE("❤️"),
    HAHA("😂"),
    WOW("😮"),
    SAD("😢");

    private final  String emoji;

    ReactionType(String emoji) {
        this.emoji = emoji;
    }

    public String getEmoji() {
        return emoji;
    }

    public static List<String> getEmojis() {
        return Arrays.stream(ReactionType.values())
                .map(ReactionType::getEmoji)
                .toList();
    }

}
