package viosmash.api.auth;

import lombok.Data;

@Data
public class UserUpdatedStatus {
    private Long userId;
    private Boolean online;
}
