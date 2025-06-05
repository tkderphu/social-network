package viosmash.service.auth;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import viosmash.BaseTest;
import viosmash.pojo.api.profile.CheckUserReqVO;
import viosmash.profile.api.UserApi;
import viosmash.pojo.api.profile.UserDTO;
import viosmash.controller.post.vo.AuthLoginReqVO;
import viosmash.controller.post.vo.AuthLoginRespVO;
import viosmash.exception.ServiceException;
import viosmash.pojo.CommonResult;

import static org.junit.jupiter.api.Assertions.*;
import static viosmash.exception.utils.ServiceUtils.exception;

@Slf4j
class AuthServiceTest extends BaseTest {

    @MockitoBean
    private UserApi userApi;
    @Autowired
    private AuthService authService;


    @Test
    void login_when_user_or_password_not_match_then_throw_exception() {
        Mockito.when(userApi.checkUser(Mockito.any(CheckUserReqVO.class))).thenAnswer(invocationOnMock -> {
            CheckUserReqVO actualReq = invocationOnMock.getArgument(0);
            if(!actualReq.getEmail().equals("test")) {
               return CommonResult.error("email not match", 404);
           }
           if(!actualReq.getPassword().equals("test")) {
               return CommonResult.error("password not match", 404);
           }
           UserDTO userDTO = new UserDTO();
           userDTO.setId(2l);
           return CommonResult.success(userDTO);
        });
//        CommonResult<UserDTO> result = userApi.checkUser(req);
//        log.info("result: {}", result);
        AuthLoginReqVO authReq = new AuthLoginReqVO();
        authReq.setPassword("tete");
        authReq.setEmail("test");
        ServiceException serviceException = assertThrows(ServiceException.class, () -> {
            authService.login(authReq);
        });

        log.info("info exception: {}", serviceException);

    }


    @Test
    void login_then_return_success() {
        Mockito.when(userApi.checkUser(Mockito.any(CheckUserReqVO.class))).thenAnswer(invocationOnMock -> {
            CheckUserReqVO actualReq = invocationOnMock.getArgument(0);
            if(!actualReq.getEmail().equals("test")) {
                return CommonResult.error("email not match", 404);
            }
            if(!actualReq.getPassword().equals("test")) {
                return CommonResult.error("password not match", 404);
            }
            UserDTO userDTO = new UserDTO();
            userDTO.setId(2L);
            return CommonResult.success(userDTO);
    });
        AuthLoginReqVO authReq = new AuthLoginReqVO();
        authReq.setPassword("test");
        authReq.setEmail("test");
        AuthLoginRespVO login = authService.login(authReq);
        log.info("auth resp: {}", login);

    }


    @Test
    void logout() {
    }

    @Test
    void refreshToken() {
    }
}