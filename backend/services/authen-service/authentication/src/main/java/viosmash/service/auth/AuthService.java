package viosmash.service.auth;

import viosmash.controller.vo.AuthLoginReqVO;
import viosmash.controller.vo.AuthLoginRespVO;

public interface AuthService {
    AuthLoginRespVO login(AuthLoginReqVO loginReqVO);
    void logout(String accessToken, String refreshToken);
    AuthLoginRespVO refreshToken(String refreshToken);
}
