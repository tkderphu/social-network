package viosmash.service.auth;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import viosmash.profile.api.CheckUserReqVO;
import viosmash.profile.api.UserApi;
import viosmash.profile.api.UserDTO;
import viosmash.controller.post.vo.AuthLoginReqVO;
import viosmash.controller.post.vo.AuthLoginRespVO;
import viosmash.dal.dataobject.AuthAccessToken;
import viosmash.object.BeanUtil;
import viosmash.pojo.CommonResult;
import viosmash.service.token.AuthTokenService;

import static viosmash.exception.utils.ServiceUtils.exception;

@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService{

    private final AuthTokenService authTokenService;
    private final UserApi userApi;
    @Value("${spring.authentication.forgotPassword.codeExpiredMinutes}")
    private Integer forgotPasswordExpires;

    @Override
    public AuthLoginRespVO login(@Valid AuthLoginReqVO loginReqVO) {
        CommonResult<UserDTO> result = userApi.checkUser(BeanUtil.copy(loginReqVO, CheckUserReqVO.class));
        if(result.getCode().equals(200)) {
            AuthAccessToken authAccessToken = authTokenService.createAccessToken(result.getData().getId());
            return BeanUtil.copy(authAccessToken, AuthLoginRespVO.class);
        }
        throw exception(result.getCode(), result.getMessage());
    }


    @Override
    @Transactional
    public void logout(String accessToken, String refreshToken) {
        this.authTokenService.removeAccessToken(accessToken, refreshToken);
        this.authTokenService.removeRefreshToken(refreshToken);
    }

    @Override
    public AuthLoginRespVO refreshToken(String refreshToken) {
        AuthAccessToken authAccessToken = authTokenService.refreshAccessToken(refreshToken);
        return BeanUtil.copy(authAccessToken, AuthLoginRespVO.class);
    }
}
