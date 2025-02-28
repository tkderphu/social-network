package viosmash.service.auth;

import viosmash.controller.auth.vo.AuthLoginReqVO;
import viosmash.controller.auth.vo.AuthLoginRespVO;
import viosmash.controller.auth.vo.AuthRegisterReqVO;

public interface AuthService {
    AuthLoginRespVO login(AuthLoginReqVO loginReqVO);
    void logout(String accessToken);
    AuthLoginRespVO refreshToken(String refreshToken);
    void register(AuthRegisterReqVO registerReqVO);
}
