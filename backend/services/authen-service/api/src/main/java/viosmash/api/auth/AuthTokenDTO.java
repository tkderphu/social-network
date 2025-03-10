package viosmash.api.auth;

import lombok.Data;

@Data
public class AuthTokenDTO {
    private String accessToken;
    private String refreshToken;
    private Long expires;
    private Long userId;
}
