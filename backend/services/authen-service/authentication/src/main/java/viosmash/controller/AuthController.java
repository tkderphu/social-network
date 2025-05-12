package viosmash.controller;

import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.post.vo.AuthLoginReqVO;
import viosmash.controller.post.vo.AuthLoginRespVO;
import viosmash.core.utils.LoginUser;
import viosmash.core.utils.SecurityUtils;
import viosmash.pojo.CommonResult;
import viosmash.service.auth.AuthService;

import static viosmash.pojo.CommonResult.success;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @PermitAll
    public CommonResult<AuthLoginRespVO> login(@Valid @RequestBody AuthLoginReqVO loginReqVO) {
        AuthLoginRespVO authLoginRespVO = authService.login(loginReqVO);
        return success(authLoginRespVO);
    }


    @GetMapping("/logout")
    public CommonResult<Boolean> logout() {
        LoginUser userLogin = SecurityUtils.getLoginUserMember();
        authService.logout(userLogin.getAccessToken(), userLogin.getRefreshToken());
        return success(true);
    }

    @GetMapping("/refreshToken")
    @PermitAll
    public CommonResult<AuthLoginRespVO> refreshToken(@RequestParam("refreshToken") String refreshToken) {
        AuthLoginRespVO resp = authService.refreshToken(refreshToken);
        return success(resp);
    }

}
