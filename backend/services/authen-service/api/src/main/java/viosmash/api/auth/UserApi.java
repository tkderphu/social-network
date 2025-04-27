package viosmash.api.auth;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import viosmash.enums.ApiConstant;

@FeignClient(name = ApiConstant.NAME, path = ApiConstant.PREFIX + "/user", contextId = "userApi")
public interface UserApi {
    String PREFIX = ApiConstant.PREFIX + "/user";

    @PutMapping
    void updateOnlineStatus(@RequestBody UserUpdatedStatus updatedStatus);

}
