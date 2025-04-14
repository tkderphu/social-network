package viosmash.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.NotifySetting;
import viosmash.pojo.CommonResult;
import viosmash.service.notify.NotifySettingService;

@RestController
@RequestMapping("/api/notifications/setting")
@RequiredArgsConstructor
public class NotificationSettingController {

    private final NotifySettingService notifySettingService;
    @GetMapping("/user")
    public CommonResult<NotifySetting> getNotifySetting() {
        return CommonResult.success(notifySettingService.getSetting(SecurityUtils.getLoginUserMemberId()));
    }
    @PutMapping("/friend/{enable}")
    public CommonResult<Boolean> updateEnableFriendAction(@PathVariable("enable") Boolean enable) {
        notifySettingService.updateNotifyFriendAction(SecurityUtils.getLoginUserMemberId(), enable);
        return CommonResult.success(true);
    }
    @PutMapping("/chat/{enable}")
    public CommonResult<Boolean> updateEnableChatAction(@PathVariable("enable") Boolean enable) {
        notifySettingService.updateNotifyFriendAction(SecurityUtils.getLoginUserMemberId(), enable);
        return CommonResult.success(true);
    }
    @PutMapping("/comment/{enable}")
    public CommonResult<Boolean> updateEnableCommentAction(@PathVariable("enable") Boolean enable) {
        notifySettingService.updateNotifyFriendAction(SecurityUtils.getLoginUserMemberId(), enable);
        return CommonResult.success(true);
    }
    @PutMapping("/reaction/{enable}")
    public CommonResult<Boolean> updateEnableReactionAction(@PathVariable("enable") Boolean enable) {
        notifySettingService.updateNotifyFriendAction(SecurityUtils.getLoginUserMemberId(), enable);
        return CommonResult.success(true);
    }
}
