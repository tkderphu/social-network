package viosmash.notification.api;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import viosmash.notification.enums.ApiConstant;
import viosmash.pojo.api.notification.NotificationDto;

@FeignClient(name = ApiConstant.NAME, path = ApiConstant.RPC_PREFIX)
public interface NotificationApi {

    String PREFIX = ApiConstant.RPC_PREFIX;

    @PostMapping("/send")
    void sendNotification(@RequestBody NotificationDto req);


}
