package viosmash.service.auth;

import viosmash.controller.auth.vo.*;
import viosmash.event.notify.forgotpassword.ForgotPasswordEvent;

public interface AuthService {
    AuthLoginRespVO login(AuthLoginReqVO loginReqVO);
    void logout(String accessToken, String refreshToken);
    AuthLoginRespVO refreshToken(String refreshToken);
    void register(AuthRegisterReqVO registerReqVO);
    void forgotPassword(String email);

    /**
     * verify code of (forgot password)
     * @param code
     * @return
     */
    ForgotPasswordEvent forgotPasswordVerifyCode(String code);

    /**
     * change password
     * @param userId
     * @param changePasswordReqVO
     */
    void changePassword(Long userId, AuthChangePasswordReqVO changePasswordReqVO);
    void initPassword(AuthInitPasswordReqVO initPasswordReqVO);
}
