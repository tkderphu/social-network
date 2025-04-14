package viosmash.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.NotifyMessage;
import viosmash.dal.dataobject.NotifySetting;
import viosmash.pojo.CommonResult;
import viosmash.pojo.PageResult;
import viosmash.service.firebase.FCMService;
import viosmash.service.notify.NotifyMessageService;
import viosmash.service.notify.NotifySettingService;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final FCMService fcmService;
    private final NotifyMessageService notifyMessageService;
    @GetMapping("/messages/user")
    public PageResult<NotifyMessage> getListNotifyMessage(@RequestParam(value = "page", defaultValue = "1") int page,
                                                          @RequestParam(value = "limit", defaultValue = "5") int limit) {
        return notifyMessageService.getListNotify(SecurityUtils.getLoginUserMemberId(), page, limit);
    }

    @PutMapping("/firebase/message/token/{token}")
    public void storeFirebaseMessageToken(@PathVariable("token") String token) {
        fcmService.storeFirebaseMessageToken(SecurityUtils.getLoginUserMemberId(), token);
    }

    @PutMapping("/messages/read/{notifyId}")
    public CommonResult<Boolean> readNotifyMessage(@PathVariable("notifyId") String notifyId) {
        notifyMessageService.readNotifyMessage(notifyId);
        return CommonResult.success(true);
    }
    @GetMapping("/messages/count/unread/user")
    public CommonResult<Integer> countUnreadNotifyMessage() {
        return CommonResult.success(notifyMessageService.countUnreadNotify(SecurityUtils.getLoginUserMemberId()));
    }

    @PutMapping("/messages/read-all")
    public CommonResult<Boolean> readAllNotifyMessage() {
        notifyMessageService.readAllNotifyMessage(SecurityUtils.getLoginUserMemberId());
        return CommonResult.success(true);
    }


}
