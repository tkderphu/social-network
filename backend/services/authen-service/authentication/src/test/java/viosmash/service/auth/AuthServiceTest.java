package viosmash.service.auth;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import viosmash.BaseTest;
import viosmash.controller.auth.vo.AuthLoginReqVO;
import viosmash.controller.auth.vo.AuthLoginRespVO;
import viosmash.controller.auth.vo.AuthRegisterReqVO;
import viosmash.dal.dataobject.auth.User;
import viosmash.dal.dataobject.token.AuthAccessToken;
import viosmash.dal.repository.auth.UserRepository;
import viosmash.exception.ServiceException;
import viosmash.random.RandomUtils;
import viosmash.service.token.AuthTokenService;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static viosmash.constant.ErrorCodeConstant.REFRESH_TOKEN_INVALID;

class AuthServiceTest extends BaseTest {

    @Autowired
    private AuthService authService;
    @Autowired
    private AuthTokenService authTokenService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Test
    void when_account_not_exists_try_to_login_then_throw_exception() {
        AuthLoginReqVO req = RandomUtils.randomObject(AuthLoginReqVO.class);

        ServiceException serviceException = assertThrows(ServiceException.class, () -> {
            this.authService.login(req);
        });

        Assertions.assertEquals(serviceException.getCode(), 404);
        Assertions.assertEquals(serviceException.getMessage(), "Your email is invalid");
    }

    @Test
    void when_account_exists_but_try_to_enter_wrong_password_login_then_throw_exception() {
        User user = new User().setEmail("test@gmail.com").setPassword("ttt");
        userRepository.save(user);
        AuthLoginReqVO req = RandomUtils.randomObject(AuthLoginReqVO.class, r -> {
            r.setEmail("test@gmail.com");
        });

        ServiceException serviceException = assertThrows(ServiceException.class, () -> {
            this.authService.login(req);
        });

        Assertions.assertEquals(serviceException.getCode(), 404);
        Assertions.assertEquals(serviceException.getMessage(), "Your password is invalid");
    }


    @Test
    void when_account_exists_login_then_response() {
        User user = new User().setEmail("test@gmail.com").setPassword(passwordEncoder.encode("aaa"));
        userRepository.save(user);
        AuthLoginReqVO req = RandomUtils.randomObject(AuthLoginReqVO.class, r -> {
            r.setEmail("test@gmail.com");
            r.setPassword("aaa");
        });

        AuthLoginRespVO resp = authService.login(req);
        Assertions.assertEquals(resp.getUserId(), user.getId());

    }


    @Test
    void logout_success() {
        User user = new User().setEmail("test@gmail.com").setPassword(passwordEncoder.encode("aaa"));
        userRepository.save(user);
        AuthLoginReqVO req = RandomUtils.randomObject(AuthLoginReqVO.class, r -> {
            r.setEmail("test@gmail.com");
            r.setPassword("aaa");
        });

        AuthLoginRespVO resp = authService.login(req);

        //before login
        AuthAccessToken authAccessToken = authTokenService.getAccessToken(resp.getAccessToken());
        Assertions.assertNotNull(authAccessToken);
        authService.logout(resp.getAccessToken(), resp.getRefreshToken());
        ServiceException serviceException = assertThrows(ServiceException.class, () -> {
            authTokenService.getAccessToken(resp.getAccessToken());
        });
        Assertions.assertNotNull(serviceException);

        serviceException = assertThrows(ServiceException.class, () -> {
            authTokenService.refreshAccessToken(authAccessToken.getRefreshToken());
        });

        Assertions.assertEquals(serviceException.getMessage(), REFRESH_TOKEN_INVALID.getMessage());
    }

    @Test
    void refreshToken() {
        User user = new User().setEmail("test@gmail.com").setPassword(passwordEncoder.encode("aaa"));
        userRepository.save(user);
        AuthLoginReqVO req = RandomUtils.randomObject(AuthLoginReqVO.class, r -> {
            r.setEmail("test@gmail.com");
            r.setPassword("aaa");
        });

        AuthLoginRespVO resp = authService.login(req);
        AuthLoginRespVO authLoginRespVO = authService.refreshToken(resp.getRefreshToken());

        Assertions.assertEquals(resp.getRefreshToken(), authLoginRespVO.getRefreshToken());
    }

    @Test
    void register() {
        AuthRegisterReqVO req = RandomUtils.randomObject(AuthRegisterReqVO.class);
        authService.register(req);
        AuthLoginRespVO authLoginRespVO = authService.login(RandomUtils.randomObject(AuthLoginReqVO.class, a -> {
            a.setPassword(req.getPassword());
            a.setEmail(req.getEmail());
        }));
        Assertions.assertNotNull(authLoginRespVO);
    }

    @Test
    void forgotPassword() {
    }

    @Test
    void forgotPasswordVerifyCode() {
    }

    @Test
    void changePassword() {
    }

    @Test
    void initPassword() {
    }
}