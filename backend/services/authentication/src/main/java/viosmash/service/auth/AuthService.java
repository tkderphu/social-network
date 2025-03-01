package viosmash.service.auth;

import viosmash.controller.auth.vo.*;
import viosmash.event.notify.forgotpassword.ForgotPasswordEvent;

public interface AuthService {
    AuthLoginRespVO login(AuthLoginReqVO loginReqVO);
    void logout(String accessToken, String refreshToken);
    AuthLoginRespVO refreshToken(String refreshToken);
    void register(AuthRegisterReqVO registerReqVO);
    void forgotPassword(String email);
    ForgotPasswordEvent forgotPasswordVerifyCode(String code);
    void changePassword(AuthChangePasswordReqVO changePasswordReqVO);
    void initPassword(AuthInitPasswordReqVO initPasswordReqVO);
}
