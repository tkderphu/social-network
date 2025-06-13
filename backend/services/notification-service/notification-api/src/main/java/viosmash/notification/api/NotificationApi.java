package viosmash.notification.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import viosmash.notification.enums.ApiConstant;

@FeignClient(name = ApiConstant.NAME, path = ApiConstant.RPC_PREFIX, contextId = "v1")
public interface NotificationApi {

    String PREFIX = ApiConstant.RPC_PREFIX;

    @PostMapping("/send")
    void sendAppNotification(@RequestBody NotificationDto req);

    @PostMapping("/send/mail")
    void sendMail(@RequestBody MailNotificationDto req);

}
