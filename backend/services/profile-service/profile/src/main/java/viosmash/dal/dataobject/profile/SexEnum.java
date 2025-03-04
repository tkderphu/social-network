package viosmash.dal.dataobject.profile;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum SexEnum {
    MALE("Nam"),
    FEMALE("Nu");

    @Getter
    private final String value;

    public static SexEnum of(String val) {
        try {
            return SexEnum.valueOf(val);
        } catch (Exception e) {
            return null;
        }
    }
}
