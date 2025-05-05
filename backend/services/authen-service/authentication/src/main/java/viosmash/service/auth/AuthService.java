package viosmash.service.auth;

import viosmash.controller.post.vo.AuthLoginReqVO;
import viosmash.controller.post.vo.AuthLoginRespVO;

public interface AuthService {
    AuthLoginRespVO login(AuthLoginReqVO loginReqVO);
    void logout(String accessToken, String refreshToken);
    AuthLoginRespVO refreshToken(String refreshToken);
}
