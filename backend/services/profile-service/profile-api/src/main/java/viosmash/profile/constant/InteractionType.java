package viosmash.profile.constant;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum InteractionType {
    CHAT(4),
    FRIENDS(5),
    FRIEND_REQUEST(3),
    LIKE(2),
    CLICK(1),
    COMMENT(3);

    private final int rank;
}
