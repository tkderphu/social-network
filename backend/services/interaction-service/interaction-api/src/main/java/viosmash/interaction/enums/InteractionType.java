package viosmash.interaction.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum InteractionType {
    LIKE_POST(2),
    LIKE_COMMENT(2),
    SHARE_POST(2),
    CHAT(5),
    CLICK(1);

    private final int score;
}
