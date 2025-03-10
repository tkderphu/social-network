package viosmash.controller.privacy;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.controller.privacy.vo.PrivacyRespVO;
import viosmash.dal.dataobject.privacy.MessageEnum;
import viosmash.dal.dataobject.privacy.NotificationEnum;
import viosmash.dal.dataobject.privacy.PostEnum;
import viosmash.pojo.CommonResult;
import viosmash.service.privacy.UserPrivacyService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile/privacy")
public class PrivacyController {

    private final UserPrivacyService privacyService;

    @PutMapping("/message")
    public CommonResult<Boolean> updateMessagePrivacy(@RequestBody MessageEnum messageEnum) {
        Long userId = 1L;
        privacyService.updateMessagePrivacy(userId, messageEnum);
        return CommonResult.success(true);
    }
    @PutMapping("/post")
    public CommonResult<Boolean> updatePostPrivacy(@RequestBody PostEnum postEnum) {
        Long userId = 1L;
        privacyService.updatePostPrivacy(userId, postEnum);
        return CommonResult.success(true);
    }
    @PutMapping("/notification")
    public CommonResult<Boolean> updateNotificationPrivacy(@RequestBody NotificationEnum notificationEnum) {
        Long userId = 1L;
        privacyService.updateNotificationPrivacy(userId, notificationEnum);
        return CommonResult.success(true);
    }

    public CommonResult<PrivacyRespVO> getPrivacy() {
        Long userId = 1L;
        return CommonResult.success(privacyService.getPrivacy(userId));
    }
}
