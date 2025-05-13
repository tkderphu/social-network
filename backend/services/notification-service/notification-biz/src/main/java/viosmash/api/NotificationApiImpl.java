package viosmash.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import viosmash.notification.api.NotificationApi;
import viosmash.notification.api.NotificationDto;
import viosmash.service.notify.SendNotifyService;

@RestController
@RequiredArgsConstructor
@RequestMapping(NotificationApi.PREFIX)
@Slf4j
public class NotificationApiImpl implements NotificationApi {

    private final SendNotifyService sendNotifyService;

    @Override
    @PostMapping("/send")
    public void sendNotification(@RequestBody NotificationDto req) {
        switch (req.getType()) {
            case FORGOT_PASSWORD -> {
                log.info("begin send");
                sendNotifyService.mailNotifySingleMessage(req.getProperties(), req.getType(), "Forgot password");
                log.info("end send");
            }
        }
    }
}
