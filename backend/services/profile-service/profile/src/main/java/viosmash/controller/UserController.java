package viosmash.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import viosmash.collection.CollUtils;
import viosmash.controller.vo.*;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.User;
import viosmash.dal.redis.ForgotCodeRedis;
import viosmash.friendship.api.FriendshipApi;
import viosmash.object.BeanUtil;
import viosmash.pojo.CommonResult;
import viosmash.profile.constant.AddressEnum;
import viosmash.profile.constant.PolicyEnum;
import viosmash.profile.constant.EducationEnum;
import viosmash.service.UserService;
import viosmash.string.StringUtils;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/profiles")
public class UserController {
    private final UserService userService;
    private final ForgotCodeRedis forgotCodeRedis;
    private final FriendshipApi friendshipApi;

    @GetMapping("/search")
    public CommonResult<List<UserRespVO>> search(@RequestParam("name") String name) {
        List<UserRespVO> userRespVOS = userService.searchUser(name);
        return CommonResult.success(userRespVOS);
    }

    @GetMapping("/search/interaction")
    public CommonResult<List<UserRespVO>> searchUsersCanInteract(@RequestParam("keyword") String keyword) {
        Set<Long> userIds = friendshipApi.getListUserCanInteract(SecurityUtils.getLoginUserMemberId());
        List<User> users = userService.searchUser(keyword, userIds);

        return CommonResult.success(CollUtils.convertList(users, user -> {
            return BeanUtil.copy(user, UserRespVO.class);
        }));
    }


    @GetMapping("/{userId}")
    public CommonResult<UserRespVO> getProfile(@PathVariable("userId") Long userId) {
        UserRespVO profile = userService.getProfile(userId);
        log.info("clgt: {}", profile);
        return CommonResult.success(profile);

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
    public CommonResult<Boolean> updatePolicy(@RequestBody Map<String, String> privates) {
        userService.updatePolicy(SecurityUtils.getLoginUserMemberId(), privates);
        return CommonResult.success(true);
    }

    @PutMapping("/education")
    public CommonResult<Boolean> updateEducation(@RequestBody Map<String, String> education) {
        userService.updateSchool(SecurityUtils.getLoginUserMemberId(), education);
        return CommonResult.success(true);
    }

    @PutMapping("/address")
    public CommonResult<Boolean> updateAddress(@RequestBody Map<String, String> address) {
        userService.updateAddress(SecurityUtils.getLoginUserMemberId(), address);
        return CommonResult.success(true);
    }



    @PostMapping("/block")
    public CommonResult<Boolean> updateBlockUser(@RequestBody BlockedUserReqVO req) {
        userService.updateBlockUser(
                SecurityUtils.getLoginUserMemberId(),
                req.getToUserId(),
                req.getBlockType()
        );

        return CommonResult.success(true);
    }


    @GetMapping("/block")
    public CommonResult<List<UserRespVO>> getListBlockedUser() {
        return CommonResult.success(userService.getListBlockedUser(SecurityUtils.getLoginUserMemberId()));
    }


    @GetMapping("/block/check/{userId}")
    public CommonResult<BlockedUserStatusResp> getStatusBlocked(
            @PathVariable("userId") Long userId
    ) {
        return CommonResult.success(userService.checkBlocked(SecurityUtils.getLoginUserMemberId(), userId));
    }

}
