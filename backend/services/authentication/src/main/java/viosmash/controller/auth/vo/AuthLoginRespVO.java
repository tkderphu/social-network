package viosmash.controller.auth.vo;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class AuthLoginRespVO {
    private Long userId;
    private String accessToken;
    private String refreshToken;
    private Long expires;
}
