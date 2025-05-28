package viosmash.interaction.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum InteractionType {
    LIKE(1),
    COMMENT(2),
    SHARE_POST(2),
    CHAT(5),
    CLICK(1),
    FRIENDS(10);
    private final int score;
}
