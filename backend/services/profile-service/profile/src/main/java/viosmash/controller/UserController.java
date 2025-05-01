package viosmash.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.constant.AddressEnum;
import viosmash.constant.PolicyEnum;
import viosmash.constant.SchoolEnum;
import viosmash.controller.vo.UserCreateReqVO;
import viosmash.controller.vo.UserRespVO;
import viosmash.controller.vo.UserUpdateInfoReqVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.pojo.CommonResult;
import viosmash.service.UserService;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/profiles")
public class UserController {
    private final UserService userService;

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
