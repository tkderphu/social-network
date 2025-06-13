package viosmash.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.vo.NotificationSettingReqVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.NotificationSetting;
import viosmash.pojo.CommonResult;
import viosmash.service.notification.NotificationSettingService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications/setting")
public class NotificationSettingController {
    private final NotificationSettingService notificationSettingService;

    @PutMapping("/push")
    public CommonResult<Boolean> updatePush(@RequestBody NotificationSettingReqVO req) {
        notificationSettingService.updateSetting(
                SecurityUtils.getLoginUserMemberId(),
                req
        );
        return CommonResult.success(true);
    }
    @GetMapping
    public CommonResult<NotificationSetting> getNotificationSetting() {
        NotificationSetting notificationSetting = this.notificationSettingService
                .getNotificationSetting(SecurityUtils.getLoginUserMemberId());
        return CommonResult.success(notificationSetting);
    }

}
