package viosmash.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import viosmash.core.utils.SecurityUtils;
import viosmash.dal.dataobject.NotifyMessage;
import viosmash.service.firebase.FCMService;
import viosmash.service.notify.NotifyMessageService;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final FCMService fcmService;
    private final NotifyMessageService notifyMessageService;
    public List<NotifyMessage> getListNotifyMessage(@RequestParam(value = "page", defaultValue = "1") int page,
                                                    @RequestParam(value = "limit", defaultValue = "5") int limit) {
        return notifyMessageService.getListNotify(
                SecurityUtils.getLoginUserMemberId(), page, limit);
    }

    @GetMapping("/send")
    public String sendNotification(@RequestParam String token,
                                   @RequestParam String title,
                                   @RequestParam String body) {
        fcmService.sendNotification(title, body, token);
        return "Notification Sent!";
    }

}
