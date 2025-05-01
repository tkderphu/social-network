package viosmash.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import viosmash.collection.CollUtils;
import viosmash.string.StringUtils;

import java.util.List;

import static viosmash.collection.CollUtils.*;
import static viosmash.string.StringUtils.equal;

@AllArgsConstructor
public enum PolicyEnum {
    CHAT(List.of("ANYONE", "ONLY_FRIENDS")),
    NOTIFICATION(List.of("ANYTHING", "ONLY_FRIENDS")),
    POST(List.of("ANYONE", "ONLY_MYSELF", "ONLY_FRIENDS"));

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
