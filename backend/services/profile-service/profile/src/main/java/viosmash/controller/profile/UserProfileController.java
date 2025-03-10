package viosmash.controller.profile;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.profile.vo.UserProfileRespVO;
import viosmash.controller.profile.vo.UserProfileUpdateReqVO;
import viosmash.pojo.CommonResult;
import viosmash.service.profile.UserProfileService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/profiles")
public class UserProfileController {
    private final UserProfileService userProfileService;


    @GetMapping
    public CommonResult<UserProfileRespVO> getProfile() {
        Long userId = 1L;
        return CommonResult.success(userProfileService.getProfileById(userId));
    }

    @PutMapping
    public CommonResult<Boolean> updateProfile(@RequestBody UserProfileUpdateReqVO req) {
        Long userId = 1L;
        userProfileService.updateProfile(userId, req);
        return CommonResult.success(true);
    }

}
