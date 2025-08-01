package viosmash.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import viosmash.controller.vo.NotificationSettingReqVO;
import viosmash.controller.vo.NotificationSettingRespVO;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.NotificationSetting;
import viosmash.object.BeanUtil;
import viosmash.pojo.CommonResult;
import viosmash.service.notification.NotificationSettingService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notification-settings")
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
    public CommonResult<NotificationSettingRespVO> getNotificationSetting() {
        log.info("notify");
        NotificationSetting notificationSetting = this.notificationSettingService
                .getNotificationSetting(SecurityUtils.getLoginUserMemberId());
        log.info("fuck: {}", notificationSetting);
        return CommonResult.success(BeanUtil.copy(notificationSetting, NotificationSettingRespVO.class));
    }

}
