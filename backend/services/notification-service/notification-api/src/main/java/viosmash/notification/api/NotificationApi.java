package viosmash.notification.api;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import viosmash.notification.enums.ApiConstant;

@FeignClient(name = ApiConstant.NAME, path = ApiConstant.RPC_PREFIX)
public interface NotificationApi {

    String PREFIX = ApiConstant.RPC_PREFIX;

    @PostMapping("/send")
    void sendNotification(@RequestBody NotificationDto req);


}
