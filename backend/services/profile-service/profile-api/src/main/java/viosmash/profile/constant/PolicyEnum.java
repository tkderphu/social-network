package viosmash.profile.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

import static viosmash.collection.CollUtils.*;
import static viosmash.string.StringUtils.equal;

@AllArgsConstructor
public enum PolicyEnum {
    CHAT(List.of("ANYONE", "ONLY_FRIENDS")), //chat
    NOTIFICATION(List.of("ANYONE", "FRIENDS_NOTIFY")), //notification
    POST(List.of("ANYONE", "ONLY_ME", "ONLY_FRIENDS")); //display post

    @Getter
    private final List<String> values;

    public static boolean isExists(String policy, String value) {
        return convertList(PolicyEnum.values()).stream()
                .filter((policyEnum) -> {
                   return equal(policy, policyEnum.name()) && policyEnum.isExists(value);
                })
                .findFirst()
                .isPresent();
    }


    public boolean isExists(String value) {
        return values.stream()
                .filter(q -> equal(q, value))
                .findFirst().isPresent();
    }
}
