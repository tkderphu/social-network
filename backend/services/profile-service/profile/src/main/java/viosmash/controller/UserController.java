package viosmash.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.post.vo.*;
import viosmash.dal.redis.ForgotCodeRedis;
import viosmash.profile.constant.AddressEnum;
import viosmash.profile.constant.PolicyEnum;
import viosmash.profile.constant.SchoolEnum;
import viosmash.core.utils.SecurityUtils;
import viosmash.pojo.CommonResult;
import viosmash.service.UserService;
import viosmash.string.StringUtils;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/profiles")
public class UserController {
    private final UserService userService;
    private final ForgotCodeRedis forgotCodeRedis;
    @GetMapping("/{userId}")
    public CommonResult<UserRespVO> getProfile(@PathVariable("userId") Long userId) {
        return CommonResult.success(userService.getProfile(userId));
    }

    @PostMapping
    public CommonResult<Boolean> createProfile(@RequestBody UserCreateReqVO req) {
        userService.createUser(req);
        return CommonResult.success(true);
    }

    @PutMapping("/info")
    public CommonResult<Boolean> updateInfo(@RequestBody UserUpdateInfoReqVO req) {
        Long userId = SecurityUtils.getLoginUserMemberId();
        userService.updateInfo(userId, req);
        return CommonResult.success(true);
    }

    @GetMapping("/forgot-password")
    public CommonResult<String> forgotPassword(@RequestParam("email") String email) {
        String message = userService.forgotPassword(email);
        return CommonResult.success(message);
    }

    @GetMapping("/forgot-password/code/{code}")
    public CommonResult<Boolean> codeForgotPasswordIsExists(@PathVariable("code") String code) {
        String email = forgotCodeRedis.get(code);
        if(StringUtils.isEmpty(email)) {
            return CommonResult.success(false);
        }
        return CommonResult.success(true);
    }

    @PutMapping("/init-password")
    public CommonResult<Boolean> updateNewPassword(@RequestBody UserUpdateNewPassword req) {
        String email = forgotCodeRedis.get(req.getCodeForgotPassword());
        userService.updateNewPassword(email, req.getNewPassword());
        forgotCodeRedis.clear(req.getCodeForgotPassword());
        return CommonResult.success(true);
    }

    @PutMapping("/change-password")
    public CommonResult<Boolean> updatePassword(@RequestBody UserChangePassword req) {
        Long userId = SecurityUtils.getLoginUserMemberId();
        userService.changePassword(userId, req.getOldPassword(), req.getNewPassword());
        return CommonResult.success(true);
    }

    @PutMapping("/policy")
    public CommonResult<Boolean> updatePolicy(@RequestBody Map<PolicyEnum, String> privates) {
        userService.updatePolicy(SecurityUtils.getLoginUserMemberId(), privates);
        return CommonResult.success(true);
    }

    @PutMapping("/school")
    public CommonResult<Boolean> updateSchool(@RequestBody Map<SchoolEnum, String> school) {
        userService.updateSchool(SecurityUtils.getLoginUserMemberId(), school);
        return CommonResult.success(true);
    }
    @PutMapping("/address")
    public CommonResult<Boolean> updateAddress(@RequestBody Map<AddressEnum, String> address) {
        userService.updateAddress(SecurityUtils.getLoginUserMemberId(), address);
        return CommonResult.success(true);
    }


}
